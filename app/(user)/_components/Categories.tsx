"use client"

import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useQuery } from '@tanstack/react-query';
import { CategoryStatsResponseType } from '@/app/api/categorystats/route';

const Categories = ({ from, to }: { from: Date, to: Date }) => {
    const overviewQuery = useQuery<CategoryStatsResponseType>({
        queryKey: ["category", "overview", from, to],
        queryFn: () => fetch(`/api/categorystats?from=${from}&to=${to}`).then((res) => res.json())
    })

    const incomes = overviewQuery.data?.filter(t => t.type === "income")
    const expenses = overviewQuery.data?.filter(t => t.type === "expense")

    return (
        <div className='py-10 w-full flex md:space-x-5 lg:space-x-8'>
            {/* Chart for income breakdown */}
            <div className='border border-neutral-800 bg-neutral-950 rounded-lg p-3 lg:p-5 flex-1 h-96'>
                <h2>Income breakdown</h2>
                {overviewQuery.isLoading ? <div></div>
                    : <PieChart
                        series={[
                            {
                                data: incomes || [],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 55, additionalRadius: -5, color: 'gray' },
                                innerRadius: 60,
                                outerRadius: 100,
                                paddingAngle: 4,
                                cornerRadius: 5,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 150,
                                cy: 150,
                            }
                        ]}
                    />}
            </div>

            {/* Chart for expense breakdown */}
            <div className='border border-neutral-800 bg-neutral-950 rounded-lg p-3 lg:p-5 flex-1 h-96'>
                <h2>Expense breakdown</h2>
                {overviewQuery.isLoading ? <div></div>
                    : <PieChart
                        colors={[
                            "#FF6347", // Tomato
                            "#FFD700", // Gold
                            "#8A2BE2", // Blue Violet
                            "#32CD32", // Lime Green
                            "#FF4500", // Orange Red
                            "#9370DB", // Medium Purple
                            "#4682B4", // Steel Blue
                            "#8B4513", // Saddle Brown
                            "#B22222", // Fire Brick
                            "#9932CC"  // Dark Orchid
                        ]}
                        series={[
                            {
                                data: expenses || [],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 55, additionalRadius: -5, color: 'gray' },
                                innerRadius: 60,
                                outerRadius: 100,
                                paddingAngle: 4,
                                cornerRadius: 5,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 150,
                                cy: 150,
                            }
                        ]}
                    />}
            </div>
        </div>
    )
}

export default Categories