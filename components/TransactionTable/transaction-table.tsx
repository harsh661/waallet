"use client"

import { TransactionHistoryResponseType } from "@/app/api/transactions/route"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function TransactionTable({ heading, limit }: { heading: string, limit?: number }) {
    const transactionsQuery = useQuery<TransactionHistoryResponseType>({
        queryKey: ["overview"],
        queryFn: () => fetch(`/api/transactions`).then((res) => res.json())
    })

    const router = useRouter();

    let displayedTransactions = transactionsQuery.data;

    if (limit && Array.isArray(transactionsQuery.data)) {
        displayedTransactions = transactionsQuery.data.slice(0, limit);
    }

    return (
        <>
            <h2 className="text-3xl font-semibold mb-5">{heading}</h2>
            <Table className="text-lg">
                <TableHeader>
                    <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Income</TableHead>
                        <TableHead className="text-right">Expense</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!transactionsQuery.isLoading && displayedTransactions?.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.category}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right text-accent-green">{transaction.type === 'income' ? `₹${transaction.amount}` : '-'}</TableCell>
                            <TableCell className="text-right text-red-500">{transaction.type === 'expense' ? `-₹${transaction.amount}` : '-'}</TableCell>
                        </TableRow>
                    ))}
                    {/* Show skeleton if data is loading */}
                    {transactionsQuery.isLoading && [0, 1, 2, 3, 4].map(() => (
                        <TableRow>
                            {[0, 1, 2, 3, 4].map((_, index) => (
                                <TableCell key={index} className="font-medium">
                                    <div className={cn("w-1/2 bg-neutral-800 text-transparent rounded-sm animate-pulse", index === 4 && 'last:ml-auto')}>I</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                {limit && (
                    <TableCaption onClick={() => router.push('/transactions')} className="py-2 px-4 cursor-pointer w-max hover:!text-accent-blue">
                        Show more
                    </TableCaption>
                )}
            </Table>
        </>
    )
}
