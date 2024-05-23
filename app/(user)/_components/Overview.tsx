"use client"

import { DateRangePicker } from '@/components/DatePicker/date-range-picker'
import { startOfMonth } from 'date-fns'
import React, { useState } from 'react'
import OverviewCard from './OverviewCard'
import { Button } from '@/components/ui/button'
import AddIncomeDialog from '../_components/AddIncomeDialog'
import Categories from './Categories'
import { TransactionTable } from '@/components/TransactionTable/transaction-table'

const Overview = () => {
    const [range, setRange] = useState({
        from: startOfMonth(new Date()),
        to: new Date()
    })

    return (
        <main>
            <div className='flex items-center justify-between py-10'>
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

                <div className='flex justify-end gap-5 w-full'>
                    <AddIncomeDialog type='income' trigger={<Button variant="secondary">Add Income</Button>} />
                    <AddIncomeDialog type='expense' trigger={<Button variant="destructive">Add Expense</Button>} />
                </div>
            </div>
            <div className='grid grid-cols-3 md:space-x-5 lg:space-x-8'>
                <OverviewCard type='income' from={range.from} to={range.to} />
                <OverviewCard type='expense' from={range.from} to={range.to} />
                <OverviewCard type='saving' from={range.from} to={range.to} />
            </div>
            <Categories from={range.from} to={range.to} />
            <TransactionTable heading='Recent Transactions' limit={5} />
        </main>
    )
}

export default Overview