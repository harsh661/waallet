import React, { useMemo } from 'react'; // Changed from useCallback to useMemo
import { cn } from '@/lib/utils';
import { HandCoins, TrendingDown, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { OverviewStatsResponseType } from '@/app/api/overview/route';
import CountUp from 'react-countup';

type OverviewCardType = {
    type: "income" | "expense" | "saving",
    from: Date,
    to: Date,
}

const OverviewCard = ({ type, from, to }: OverviewCardType) => {
    const overviewQuery = useQuery<OverviewStatsResponseType>({
        queryKey: ["overview", from, to],
        queryFn: () => fetch(`/api/overview?from=${from}&to=${to}`).then((res) => res.json())
    })

    const calculateBalance = useMemo(() => {
        if (!overviewQuery.data) return 0;
        const { income, expense } = overviewQuery.data;
        if (type === "income") return income || 0;
        if (type === "expense") return expense || 0;
        return (income || 0) - (expense || 0);
    }, [overviewQuery.data, type]);

    const balance = calculateBalance;

    return (
        <div className='lg:p-5 bg-neutral-900/80 text-white rounded-2xl flex items-center justify-between'>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    {overviewQuery.isLoading
                        ? <div className='text-transparent w-1/3 bg-neutral-700/50 animate-pulse rounded-sm'>!</div>
                        : <p className='text-base'>
                            {
                                type === "income" ? "Incomes"
                                    : type === "expense" ? "Expenses"
                                        : type === "saving" && "Savings"
                            }
                        </p>}
                </div>
                <h2 className='text-3xl w-full pt-5'>
                    {overviewQuery.isLoading
                        ? <div className='text-transparent w-1/2 bg-neutral-700/50 animate-pulse rounded-sm'>!</div>
                        : <CountUp
                            end={balance}
                            prefix='₹'
                        />}
                </h2>
            </div>
            <div className={cn('flex items-center justify-center p-3 rounded-lg bg-yellow-500/20',
                type === "income" && 'bg-green-500/20',
                type === "expense" && 'bg-red-500/20'
            )}>
                {type === "income" ? <TrendingUp size={40} />
                    : type === "expense" ? <TrendingDown size={40} />
                        : <HandCoins size={40} />
                }
            </div>
        </div>
    )
}

export default OverviewCard;
