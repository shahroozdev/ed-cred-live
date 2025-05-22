import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"

export function DateRangePicker({
    date,
    setDate,
}: {
        date: DateRange | undefined
        setDate: (range: DateRange | undefined) => void
    }) {
    const formatted =
        date?.from && date?.to
            ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
            : "Pick a date range"

    return (
        <div className="w-full">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formatted}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}