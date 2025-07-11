"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ReactNode } from "react";
import {
  ControllerRenderProps,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";

export const FormFeilds = ({
  children,
  fieldProps,
  label,
  required,
}: {
  children: (field: ControllerRenderProps<any, string>) => React.ReactNode;
  fieldProps: { name: string; className?: string };
  label?: { text: string | ReactNode; className?: string };
  required?: boolean;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldProps?.name}
      render={({ field }) => (
        <FormItem className={fieldProps.className}>
          {label?.text && (
            <FormLabel className={label?.className}>{label?.text}{required && <span className="text-red-500">*</span>}</FormLabel>
          )}
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormTemplate = ({
  onSubmit,
  children,
  className,
  schema,
  defaultValues,
  customForm,
}: {
  onSubmit: (value: any) => void;
  children: ReactNode;
  className?: string;
  schema?: ZodType<any, any, any>;
  defaultValues?: Record<string, any>;
  customForm?: UseFormReturn<any, any, undefined>;
}) => {
  const form = customForm
    ? customForm
    : useForm({
        resolver: zodResolver(schema || z.any()),
        defaultValues: defaultValues,
      });
  const onError = (errors: any) => {
    console.log("Validation Errors", errors);
    console.log(form.getValues());
  };
  // Wrap the onSubmit prop to reset the form after submission
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res:any = await onSubmit(data); // Execute the provided onSubmit logic
      if(res?.status === 200){
        form.reset(); // Reset the form after successful submission
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  }, onError);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
};

export default FormTemplate;
