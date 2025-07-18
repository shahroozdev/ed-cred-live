import { ResetBtn } from "@/components/atoms";
import { CategoryFiltersSchema, FeedbackFilterSchema } from "@/lib/schemas";
import { X } from "lucide-react";

export const CategoryFilterForm = {
  schema: CategoryFiltersSchema,
  style:
    "!p-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full mb-5",
  btnText: "Apply Filters",
  btnIconColor: "#fff",
  btnDivClassName: "justify-end md:col-span-3 sm:col-span-2 mt-6",
  extraBtn: (
    <ResetBtn icon={<X />}  text="Clear All"/>
  ),
  arr: [
    {
      pStyle: "border-none flex-col items-start max-md:mb-2 w-full",
      style: "border-2 border-solid rounded-lg p-5 w-full",
      type: "text",
      preNode: <h1 className="text-sm font-medium text-[#374151]">Name</h1>,
      placeHolder: "Category Name",
      inputName: "name",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 border-solid rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: (
        <h1 className="text-sm font-medium text-[#374151]">From Date</h1>
      ),
      placeHolder: "Select Date",
      inputName: "from_date",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 border-solid rounded-lg px-5 h-16 w-full",
      type: "date",
      preNode: <h1 className="text-sm font-medium text-[#374151]">To Date</h1>,
      placeHolder: "Select Date",
      inputName: "to_date",
    },
  ],
};
export const FeedbackFilterForm = {
  schema: FeedbackFilterSchema,
  style:
    "!p-0 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full mb-5",
  btnText: "Apply Filters",
  btnIconColor: "#fff",
  btnDivClassName: "justify-end md:col-span-3 sm:col-span-2 mt-6",
  resetBtn: true,
  defaultValues:{category:"", subCategory:"", isDraft:undefined},
  arr: [
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 border-solid rounded-lg px-5 h-16 w-full",
      preNode: <h1 className="text-sm font-medium text-[#374151]">Category</h1>,
      type: "category",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 border-solid rounded-lg px-5 h-16 w-full",
      preNode: (
        <h1 className="text-sm font-medium text-[#374151]">Sub Category</h1>
      ),
      type: "subCategory",
    },
    {
      pStyle: "border-none flex-col items-start max-md:mb-2",
      style: "border-2 border-solid rounded-lg px-5 h-12 w-full",
      type: "select",
      preNode: <h1 className="text-sm font-medium text-[#374151]">Status</h1>,
      placeHolder: "Status",
      inputName: "isDraft",
      options: [
        { value: "true", label: "Draft" },
        { value: "false", label: "Active" },
      ],
    },
  ],
};
