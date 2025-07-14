import {
  Button,
  CategorySelect2,
  FormFeilds,
  FormTemplate,
  ResetBtn,
} from "@/components/atoms";
import Select3 from "@/components/atoms/select/select3";
import SubCategorySelect2 from "@/components/atoms/subCategorySelect/index2";
import { FeedbackFilterSchema } from "@/lib/schemas";
import { getAllParam } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

const FilterFormDashboard = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: Record<string, any>) => {
    startTransition(() => {
      const queryParams = getAllParam(data);
      router.push(`?page=1&${queryParams}`);
    });
  };
  return (
    <FormTemplate
      schema={FeedbackFilterSchema}
      onSubmit={onSubmit}
      defaultValues={{ categoryId: "", subCategoryId: "", isDraft: "" }}
      className="space-y-4"
    >
      <div className="py-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 w-full mb-5">
        <FormFeilds
          fieldProps={{ name: "categoryId" }}
          label={{ text: "Category" }}
        >
          {(field) => (
            <CategorySelect2
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "subCategoryId" }}
          label={{ text: "Subcategory" }}
        >
          {(field) => (
            <SubCategorySelect2
              {...field}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        </FormFeilds>
        <FormFeilds fieldProps={{ name: "isDraft" }} label={{ text: "Status" }}>
          {(field) => (
            <Select3
              {...field}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Status"
              options={[{label:'Draft', value:'true'}, {label:'Active', value:'false'}]}
            />
          )}
        </FormFeilds>
      </div>
      <div className="flex justify-end gap-4 items-center w-full">
        <ResetBtn icon={<X />} text={"Clear Filters"} />
        <Button variant="primary" disabled={isPending} loading={isPending}>
          Apply Filters
        </Button>
      </div>
    </FormTemplate>
  );
};

export default FilterFormDashboard;
