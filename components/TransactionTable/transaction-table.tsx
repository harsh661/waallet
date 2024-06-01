"use client"

import { TransactionHistoryResponseType } from "@/app/api/transactions/route"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationEllipsis, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination"

export function TransactionTable({ heading, limit }: { heading: string, limit?: number }) {
    const [page, setPage] = useState(1);

    const transactionsQuery = useQuery<TransactionHistoryResponseType>({
        queryKey: ["overview", page, limit],
        queryFn: () => fetch(`/api/transactions?page=${page}&limit=${limit}`).then((res) => res.json())
    })

    let displayedTransactions = transactionsQuery.data?.transactions;

    // Pagination functions
    const handlePrevious = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    }

    const handleNext = () => {
        setPage((prevPage) => (prevPage + 1));
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
                    {transactionsQuery.isLoading && [0, 1, 2, 3, 4].map((i) => (
                        <TableRow key={i}>
                            {[0, 1, 2, 3, 4].map((_, index) => (
                                <TableCell key={index} className="font-medium">
                                    <div className={cn("w-1/2 bg-neutral-800 text-transparent rounded-sm animate-pulse", index === 4 && 'last:ml-auto')}>I</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
                <TableCaption>
                    <Pagination className="w-full">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious onClick={handlePrevious} />
                            </PaginationItem>
                            <PaginationItem>
                                {Array.from({ length: transactionsQuery.data?.totalPages as number }, (_, i) => i + 1).map((pageNo) => (
                                    <PaginationLink
                                        key={pageNo}
                                        onClick={() => setPage(pageNo)}
                                        className={page === pageNo ? 'bg-neutral-100 text-neutral-950' : ''}
                                    >{pageNo}</PaginationLink>
                                ))}
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext onClick={handleNext} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </TableCaption>
            </Table>
        </>
    )
}
