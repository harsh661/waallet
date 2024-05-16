import { Button } from '@/components/ui/button'
import React from 'react'
import AddIncomeDialog from '../_components/AddIncomeDialog'
import Overview from '../_components/Overview'

const page = () => {
  return (
    <div className='w-full px-8'>
      <div className='flex justify-end gap-5 w-full py-8'>
        <AddIncomeDialog type='income' trigger={<Button variant="secondary">Add Income</Button>} />
        <AddIncomeDialog type='expense' trigger={<Button variant="destructive">Add Expense</Button>} />
      </div>
      <Overview />
    </div>
  )
}

export default page