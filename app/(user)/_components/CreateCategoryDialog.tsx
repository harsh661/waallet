import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePlus } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import EmojiPicker, { Categories } from 'emoji-picker-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'
import { Theme } from 'emoji-picker-react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCategory } from '../_actions/categories';
import { Category } from '@prisma/client';

const CreateCategoryDialog = ({ type }: { type: TransactionType }) => {
  const [formOpen, setFormOpen] = useState(false);

  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    }
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({ name: "", icon: "", type })

      await queryClient.invalidateQueries({
        queryKey: ["categories"]
      })

      setFormOpen(prev => !prev)
    }
  })

  const onSubmit = useCallback((values: CreateCategorySchemaType) => {
    mutate(values)
  }, [mutate])

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='w-full flex justify-start gap-2 px-1 hover:bg-transparent hover:text-white text-white/70'
        >
          <SquarePlus size={18} /> Create new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new category<span className={cn('px-2 py-[2px] ml-1 rounded-md text-sm', type === 'expense' ? 'text-red-500 bg-red-500/20' : 'text-emerald-500 bg-emerald-500/20')}>{type}</span></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              defaultValue=''
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              defaultValue=''
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant='outline' className='border-white/10 w-full h-28'>
                          <div className='flex flex-col items-center'>
                            {form.watch("icon") ? <div className='text-2xl'>{form.watch("icon")}</div> : <div>No icon selected</div>}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-full h-full'>
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native)
                          }} />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => form.reset()} variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type='submit'
            variant='secondary'
            disabled={isPending}
          >Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategoryDialog