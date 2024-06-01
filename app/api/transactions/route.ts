import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "5", 10);

  const overView = await getTransactionHistory(user.id, page, limit);

  return new Response(JSON.stringify(overView), {
    headers: { "Content-Type": "application/json" },
  });
}

export type TransactionHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;

async function getTransactionHistory(userId: string, page: number, limit: number) {
  const offset = (page - 1) * limit;

  const transactions = await prisma.transaction.groupBy({
    by: ["type", "category", "date"],
    where: {
      userId,
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      date: "desc",
    },
    skip: offset,
    take: limit,
  });

  const totalTransactions = await prisma.transaction.count({
    where: { userId },
  });

  const formattedTransactions = transactions.map((transaction, index) => ({
    id: offset + index,
    amount: transaction._sum.amount,
    category: transaction.category,
    date: transaction.date,
    type: transaction.type,
  }));

  return {
    transactions: formattedTransactions,
    total: totalTransactions,
    page,
    totalPages: Math.ceil(totalTransactions / limit),
  };
}
