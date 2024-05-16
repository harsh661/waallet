"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { CreateTransactionSchema, CreateTransactionSchemaType } from '@/schema/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import CategoryPicker from './CategoryPicker';
import DatePicker from './DatePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTransaction } from '../_actions/transaction';

interface IncomeDialogProps {
    trigger: ReactNode
    type: TransactionType
}

const AddIncomeDialog: React.FC<IncomeDialogProps> = ({ trigger, type }) => {
    const form = useForm<CreateTransactionSchemaType>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            type,
            date: new Date()
        }
    })

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: CreateTransaction,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["transaction"]
            })
            console.log('Transaction Created')
        }
    })

    const onSubmit = useCallback((data: CreateTransactionSchemaType) => {
        mutate(data);
    }, [mutate])

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='border-white/10 outline-none'>
                <DialogHeader>
                    <DialogTitle>Create a new Transaction <span className={cn('px-2 py-[2px] ml-1 rounded-md text-sm', type === 'expense' ? 'text-red-500 bg-red-500/20' : 'text-emerald-500 bg-emerald-500/20')}>{type}</span></DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                        <FormField
                            control={form.control}
                            name="amount"
                            defaultValue={0}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Enter the amount" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            defaultValue=''
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='grid grid-cols-2 gap-5'>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <CategoryPicker type={type} form={form} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <DatePicker />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddIncomeDialog