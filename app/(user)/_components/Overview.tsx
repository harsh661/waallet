import { cn } from '@/lib/utils'
import { HandCoins, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

type OverviewCardType = {
    title: string,
    amount: number,
    increase?: boolean,
    decrease?: boolean
}

const OverviewCard = ({ title, amount, increase, decrease }: OverviewCardType) => (
    <div className='lg:p-5 bg-neutral-900/80 text-white rounded-2xl flex items-center justify-between'>
        <div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>{title}</p>
            </div>
            <h2 className='text-2xl pt-5'>₹{amount}</h2>
        </div>
        <div className={cn('flex items-center justify-center p-3 rounded-lg bg-yellow-500/20',
            increase && 'bg-green-500/20',
            decrease && 'bg-red-500/20'
        )}>
            {increase ? <TrendingUp size={40} />
                : decrease ? <TrendingDown size={40} />
                    : <HandCoins size={40} />
            }
        </div>
    </div>
)

const Overview = () => {
    return (
        <div className='grid grid-cols-3 md:space-x-5 lg:space-x-8'>
            <OverviewCard title='Incomes' amount={1999} increase />
            <OverviewCard title='Expenses' amount={999} decrease />
            <OverviewCard title='Savings' amount={1000} />
        </div>
    )
}

export default Overview