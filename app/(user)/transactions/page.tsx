import { TransactionTable } from '@/components/TransactionTable/transaction-table'
import React from 'react'

const page = () => {
  return (
    <div className='px-8 py-10'>
      <TransactionTable heading='Your Transactions' limit={10} />
    </div>
  )
}

export default page