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

  const categorystats = await getCategoryStats(
    user.id,
    queryParams.data?.from,
    queryParams.data.to
  );

  return Response.json(categorystats);
}

export type CategoryStatsResponseType = Awaited<
  ReturnType<typeof getCategoryStats>
>;

export async function getCategoryStats(userId: string, from: Date, to: Date) {
  const stats = await prisma.transaction.groupBy({
    by: ["type", "category"],
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
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  const formattedStats = stats.map((trans, index) => ({
    id: index,
    value: trans._sum.amount || 0,
    label: trans.category,
    type: trans.type,
  }));

  return formattedStats;
}
