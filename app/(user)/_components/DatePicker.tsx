import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { PopoverContent } from '@radix-ui/react-popover'
import { Calendar } from "@/components/ui/calendar"
import React from 'react'
import { CalendarDays } from 'lucide-react'

const DatePicker = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
        <Popover>
            <PopoverTrigger asChild className='w-full'>
                <Button
                    type='button'
                    variant='outline'
                    className='w-full border-neutral-800 bg-neutral-950 flex justify-between'
                >
                    {date?.toLocaleDateString() || 'Pick a date'}
                    <CalendarDays size={16} stroke='#858585'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border bg-neutral-950"
                    disabled={(date) => date > new Date()}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker