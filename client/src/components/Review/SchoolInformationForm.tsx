"use client";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Define validation schema
const SchoolInformationFormSchema = z.object({
    employeeName: z.string().min(2, "Name is required"),
    schoolName: z.string().min(2, "School name is required"),
    schoolCountry: z.string().min(1, "Country is required"),
    schoolDates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }),
    schoolWebsite: z.string().url("Invalid URL"),
    salaryRange: z.object({
        min: z.number().nonnegative("Invalid amount"),
        max: z.number().nonnegative("Invalid amount"),
    }),
});

const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany"];

const SchoolInformationForm = () => {
    const form = useForm({
        resolver: zodResolver(SchoolInformationFormSchema),
        defaultValues: {
            employeeName: "",
            schoolName: "",
            schoolCountry: "",
            schoolDates: { from: undefined, to: undefined },
            schoolWebsite: "",
            salaryRange: { min: 0, max: 0 },
        },
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Card className="my-10">
            <CardHeader>
                <CardTitle>School Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
                        {/* Employee Name */}
                        <FormField
                            control={form.control}
                            name="employeeName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Employee</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* School Name */}
                        <FormField
                            control={form.control}
                            name="schoolName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* School Country */}
                        <FormField
                            control={form.control}
                            name="schoolCountry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Country</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries.map((country) => (
                                                    <SelectItem key={country} value={country}>
                                                        {country}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* School Dates */}
                        <FormField
                            control={form.control}
                            name="schoolDates"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dates I am/was at the school</FormLabel>
                                    <div className="flex gap-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline">
                                                    {field.value.from ? format(field.value.from, "PPP") : "Start Date"}
                                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value.from}
                                                    onSelect={(date) => form.setValue("schoolDates.from", date)}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline">
                                                    {field.value.to ? format(field.value.to, "PPP") : "End Date"}
                                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value.to}
                                                    onSelect={(date) => form.setValue("schoolDates.to", date)}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* School Website */}
                        <FormField
                            control={form.control}
                            name="schoolWebsite"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Website Address</FormLabel>
                                    <FormControl>
                                        <Input type="url" placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Salary Range */}
                        <FormField
                            control={form.control}
                            name="salaryRange"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Yearly Salary Range (USD)</FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Min"
                                                value={field.value.min}
                                                onChange={(e) => form.setValue("salaryRange.min", Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <div className="text-center">to</div>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Max"
                                                value={field.value.max}
                                                onChange={(e) => form.setValue("salaryRange.max", Number(e.target.value))}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*<Button type="submit">Submit</Button>*/}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default SchoolInformationForm;
