import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const CountryDropdown = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
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
        <Select value={value} onValueChange={onChange}>
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