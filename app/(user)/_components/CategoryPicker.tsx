import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TransactionType } from '@/lib/types'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import CreateCategoryDialog from './CreateCategoryDialog'

const CategoryPicker = ({ type }: { type: TransactionType }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [emojiEditOpen, setEmojiEditOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json())
  })

  return (
    <Select onValueChange={(val) => setSelectedCategory(val)}>
      <SelectTrigger className="w-1/2">
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
              value={item.name}
              className='flex justify-start gap-2 text-white/70 py-2'
            >
              {item.icon}
              {item.name}
              {item.name === selectedCategory}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CategoryPicker