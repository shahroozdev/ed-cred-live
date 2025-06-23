import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select"

interface CategorySelect2Props extends SelectProps {}

export const CountryDropdown = ({ value, onValueChange, ...props }: CategorySelect2Props) => {
    const countries = [
        "United States",
        "Canada",
        "United Kingdom",
        "Germany",
        "France",
        "India",
        "China",
        "Japan",
        "Australia",
        "Brazil",
        "South Korea",
        "Russia",
        "Mexico",
        "Italy",
        "Spain",
        "South Africa",
        "Saudi Arabia",
    ]

    return (
        <Select value={value} onValueChange={onValueChange} {...props}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
                {countries?.map((country) => (
                    <SelectItem key={country} value={country}>
                        {country}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}