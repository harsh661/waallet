import { HistoryPeriodResponseType } from '@/app/api/history-period/route'
import { useQuery } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction } from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { PeriodType, TimeFrameType } from '@/lib/types'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '../ui/select'

interface HistoryPeriodSelectorProps {
    period: PeriodType,
    setPeriod: Dispatch<SetStateAction<PeriodType>>,
    timeframe: TimeFrameType,
    setTimeframe: Dispatch<SetStateAction<TimeFrameType>>
}

const HistoryPeriodSelector = ({ period, setPeriod, timeframe, setTimeframe }: HistoryPeriodSelectorProps) => {
    const overviewQuery = useQuery<HistoryPeriodResponseType>({
        queryKey: ["overview", "history", "periods"],
        queryFn: () => fetch('/api/history-period').then((res) => res.json())
    })

    if (!overviewQuery.data) return

    return (
        <div className='flex items-center gap-3'>
            <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as TimeFrameType)}>
                <TabsList>
                    <TabsTrigger value='year'>Year</TabsTrigger>
                    <TabsTrigger value='month'>Month</TabsTrigger>
                </TabsList>
            </Tabs>
            <YearDropdown period={period} setPeriod={setPeriod} years={overviewQuery.data} />
            {timeframe !== 'year' && <MonthDropdown period={period} setPeriod={setPeriod} />}
        </div>
    )
}

export default HistoryPeriodSelector;

const YearDropdown = ({
    period,
    setPeriod,
    years
}: {
    period: PeriodType,
    setPeriod: Dispatch<SetStateAction<PeriodType>>,
    years: HistoryPeriodResponseType
}) => {
    return (
        <Select
            value={period.year?.toString()}
            onValueChange={value => setPeriod({ month: period.month, year: parseInt(value) })}
        >
            <SelectTrigger className='w-40'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {years.map((year) => (
                    <SelectItem key={year?.toString()} value={year?.toString()}>{year?.toString()}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

const MonthDropdown = ({
    period,
    setPeriod,
}: {
    period: PeriodType,
    setPeriod: Dispatch<SetStateAction<PeriodType>>,
}) => {
    return (
        <Select
            value={period.month?.toString()}
            onValueChange={value => setPeriod({ year: period.year, month: parseInt(value) })}
        >
            <SelectTrigger className='w-40'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
                    const monthStr = new Date(period.year, month, 1).toLocaleString("default", { month: "long" })
                    return (
                        <SelectItem key={month?.toString()} value={month?.toString()}>{monthStr}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}