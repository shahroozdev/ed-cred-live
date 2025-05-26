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
} from "react-hook-form";
import { ZodType } from "zod";

export const FormFeilds = ({
  children,
  fieldProps,
  label,
}: {
  children: (field: ControllerRenderProps<any, string>) => React.ReactNode;
  fieldProps: { name: string; className?: string };
  label?: { text: string | ReactNode; className?: string };
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldProps?.name}
      render={({ field }) => (
        <FormItem className={fieldProps.className}>
          {label?.text && (
            <FormLabel className={label?.className}>{label?.text}</FormLabel>
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
}: {
  onSubmit: (value: any) => void;
  children: ReactNode;
  className?: string;
  schema: ZodType<any, any, any>;
  defaultValues?: Record<string, any>;
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
};

export default FormTemplate;
