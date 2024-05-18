"use client"

import { DateRangePicker } from '@/components/DatePicker/date-range-picker'
import { startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import OverviewCard from './OverviewCard'

const Overview = () => {
    const [range, setRange] = useState({
        from: startOfMonth(new Date()),
        to: new Date()
    })

    return (
        <main>
            <div className='py-5'>
                <DateRangePicker
                    initialDateFrom={range.from}
                    initialDateTo={range.to}
                    showCompare={false}
                    onUpdate={(values) => {
                        const { from, to } = values.range

                        if (!from || !to) return;

                        setRange({ from, to })
                    }}
                />
            </div>
            <div className='grid grid-cols-3 md:space-x-5 lg:space-x-8'>
                <OverviewCard type='income' from={range.from} to={range.to} />
                <OverviewCard type='expense' from={range.from} to={range.to} />
                <OverviewCard type='saving' from={range.from} to={range.to} />
            </div>
        </main>
    )
}

export default Overview