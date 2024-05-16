import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TransactionType } from '@/lib/types'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CreateCategoryDialog from './CreateCategoryDialog'
import { UseFormReturn } from 'react-hook-form'
import { CreateTransactionSchemaType } from '@/schema/transactions'
import { json } from 'stream/consumers'

const CategoryPicker = ({ type, form }: { type: TransactionType, form: UseFormReturn<CreateTransactionSchemaType> }) => {

  const { data } = useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json())
  })

  const handleCategorySelect = (data: string) => {
    const item: { name: string, icon: string } = JSON.parse(data)
    form.setValue('category', item.name);
    form.setValue('categoryIcon', item.icon);
  };

  return (
    <Select onValueChange={handleCategorySelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose a category" />
      </SelectTrigger>
      <SelectContent className=''>
        <SelectGroup className='border-b border-off-black'>
          <CreateCategoryDialog type={type} />
        </SelectGroup>
        <SelectGroup>
          {data?.map((item: Category, index: number) => (
            <SelectItem
              key={index}
              value={JSON.stringify({ "name": item.name, "icon": item.icon })}
              className='flex justify-start gap-2 text-white/70 py-2'
            >
              {item.icon} {" "}
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CategoryPicker