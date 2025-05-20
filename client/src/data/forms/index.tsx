import { Button } from "@/components/atoms";
import { CategoryFiltersSchema } from "@/lib/schemas";
import { X } from "lucide-react";

export const CategoryFilterForm = {
  schema: CategoryFiltersSchema,
  style:
    "!p-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full mb-5",
  btnText: "Apply Filters",
  btnIconColor: "#fff",
  btnDivClassName: "justify-end md:col-span-3 sm:col-span-2 mt-6",
  extraBtn: (
    <Button
      icon={<X />}
      background="#00000000"
      variant="ghost"
      rounded={8}
      type="reset"
    >Clear All</Button>
  ),
  arr: [
    {
      pStyle: "border-none flex-col items-start max-md:mb-2 w-full",
      style: "border-2 rounded-lg p-5 w-full",
      type: "text",
      preNode: <h1 className="text-sm font-medium text-[#374151]">Name</h1>,
      placeHolder: "Category Name",
      inputName: "name",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: <h1 className="text-sm font-medium text-[#374151]">From Date</h1>,
      placeHolder: "Select Date",
      inputName: "from_date",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: <h1 className="text-sm font-medium text-[#374151]">To Date</h1>,
      placeHolder: "Select Date",
      inputName: "to_date",
    },
  ],
};
export const FeedbackFilterForm = {
  schema: CategoryFiltersSchema,
  style:
    "!p-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full mb-5",
  btnText: "Apply Filters",
  btnIconColor: "#fff",
  btnDivClassName: "justify-end md:col-span-3 sm:col-span-2 mt-6",
  extraBtn: (
    <Button
      icon={<X />}
      background="#00000000"
      variant="ghost"
      rounded={8}
      type="reset"
    >Clear All</Button>
  ),
  arr: [
    {
      type: "Category",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: <h1 className="text-sm font-medium text-[#374151]">From Date</h1>,
      placeHolder: "Select Date",
      inputName: "from_date",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: <h1 className="text-sm font-medium text-[#374151]">To Date</h1>,
      placeHolder: "Select Date",
      inputName: "to_date",
    },
  ],
};