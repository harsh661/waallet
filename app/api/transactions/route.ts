import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const overView = await getTransactionHistory(user.id);

  return Response.json(overView);
}

export type TransactionHistoryResponseType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;

export async function getTransactionHistory(userId: string) {
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
  });

  const formattedTransactions = transactions.map((transaction, index) => ({
    id: index,
    amount: transaction._sum.amount,
    category: transaction.category,
    date: transaction.date,
    type: transaction.type,
  }));

  return formattedTransactions;
}
