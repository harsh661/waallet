import React, { useEffect, useRef, useState } from 'react';
import HistoryPeriodSelector from '../DatePicker/history-period-selector';
import { PeriodType, TimeFrameType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { HistoryDataResponseType } from '@/app/api/history-data/route';
import { BarChart } from '@mui/x-charts/BarChart';

const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString('default', { month: 'long' });
};

const TransactionChart: React.FC = () => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [timeframe, setTimeFrame] = useState<TimeFrameType>('month');
    const [period, setPeriod] = useState<PeriodType>({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (chartContainerRef.current) {
                const width = chartContainerRef.current.offsetWidth;
                setContainerWidth(width);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const { data, isLoading, isError } = useQuery<HistoryDataResponseType>({
        queryKey: ['overview', 'history', timeframe, period],
        queryFn: () =>
            fetch(`/api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`).then((res) => res.json()),
    });

    const xAxisData = timeframe === 'month'
        ? data?.map((d) => d.day?.toString())
        : data?.map((d) => getMonthName(d.month));

    const incomeData = data?.map((entry) => entry.income);
    const expenseData = data?.map((entry) => entry.expense);

    return (
        <div ref={chartContainerRef} className="py-10 w-full">
            <h2 className="text-3xl font-semibold mb-5">Balance Trend</h2>
            <HistoryPeriodSelector
                period={period}
                setPeriod={setPeriod}
                timeframe={timeframe}
                setTimeframe={setTimeFrame}
            />
            <BarChart
                xAxis={[{ scaleType: 'band', data: xAxisData || [] }]}
                series={[
                    { data: incomeData || [] },
                    { data: expenseData || [] },
                ]}
                width={containerWidth}
                height={500}
            />
        </div>
    );
};

export default TransactionChart;
