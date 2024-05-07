import { Button } from '@/components/ui/button'
import React from 'react'
import AddIncomeDialog from '../_components/AddIncomeDialog'

const page = () => {
  return (
    <div className='w-full'>
      <div className='flex justify-end gap-5 p-5 w-full'>
        <AddIncomeDialog type='income' trigger={<Button variant="secondary">Add Income</Button>} />
        <AddIncomeDialog type='expense' trigger={<Button variant="destructive">Add Expense</Button>} />
      </div>
    </div>
  )
}

export default page