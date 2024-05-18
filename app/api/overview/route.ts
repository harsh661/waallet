import prisma from "@/lib/prisma";
import { OverviewSchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = OverviewSchema.safeParse({ from, to });

  if (!queryParams.success) {
    return Response.json({ error: queryParams.error.message });
  }

  const overView = await getOverviewStats(
    user.id,
    queryParams.data?.from,
    queryParams.data.to
  );

  return Response.json(overView);
}

export type OverviewStatsResponseType = Awaited<ReturnType<typeof getOverviewStats>>;

export async function getOverviewStats(userId: string, from: Date, to: Date) {
  const totals = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return {
    expense: totals.find((tran) => tran.type === "expense")?._sum.amount || 0,
    income: totals.find((tran) => tran.type === "income")?._sum.amount || 0,
  };
}
