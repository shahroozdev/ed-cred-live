"use client";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SwitchInput, TitleInput } from "../FeedbackElements";
import { useState } from "react";
import { ArrowUpFromLineIcon, ChevronDownIcon } from "lucide-react";
import { Button, CategorySelect, SubCategorySelect } from "@/components/atoms";
import { GeneralFormSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import { Question } from "@/types";
import AddQuestion from "./addQuestion";
import QuestionsList from "./QuestionsList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FeedbackForm = () => {
  const { MutateFunc, isPending } = useMutate();
  const [questionsList, setQuestionsList] = useState<Question[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof GeneralFormSchema>>({
    resolver: zodResolver(GeneralFormSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
      details: {
        salary: false,
        schoolName: false,
        schoolWebsite: false,
        schoolCountry: false,
        reportingPeriod: false,
        pricipalName: false,
        pricipalDivison: false,
        directorName: false,
      },
      isDraft: "inactive",
      questions: questionsList,
    },
  });

  const onSubmit = async (data: z.infer<typeof GeneralFormSchema>) => {
    if (questionsList?.length < 1) {
      setIsError(true);
      return;
    }
    setIsError(false);
    await MutateFunc({
      url: "/feedback-form",
      method: "POST",
      body: {
        ...data,
        isDraft: data?.isDraft === "active" ? false : true,
        subCategoryId: Number(data?.subCategoryId),
        categoryId: Number(data?.categoryId),
        questions: questionsList,
      },
      sendTo: "/feedback",
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start justify-between gap-10"
        >
          <MetaDataInput form={form} loading={isPending} />
          {isError && (
            <p className="text-red-500">
              At least one question must be provided.
            </p>
          )}
        </form>
      </Form>
      <AddQuestion setQuestionsList={setQuestionsList} />
      <Button
        icon={<ArrowUpFromLineIcon />}
        variant={"primary"}
        className="w-full font-normal"
        type="submit"
        loading={isPending}
      >
        Publish Feedback
      </Button>
      <QuestionsList
        questionsList={questionsList}
        setQuestionsList={setQuestionsList}
      />
    </div>
  );
};

const MetaDataInput = ({
  form,
  loading,
}: {
  form: UseFormReturn<z.infer<typeof GeneralFormSchema>>;
  loading: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="outline-muted relative flex w-full flex-col gap-4 rounded-md p-6 outline-2 isolate shadow-sm">
      <ChevronDownIcon
        className={`absolute right-6 top-6 transition-transform ${
          collapsed ? "rotate-0" : "rotate-180"
        }`}
        onClick={() => setCollapsed((s) => !s)}
      />
      <div
        className={`${
          collapsed ? "opacity-100" : "opacity-0"
        } bg-destructive text-white absolute bottom-6 right-6 rounded-sm text-sm px-3 py-1 -z-10`}
      >
        required
      </div>
      <div className="">
        <div className="text-2xl font-semibold">Form Metadata</div>
        <p className="text-muted-foreground mb-0 text-sm">
          Metadata means data about data. This is information about the feedback
          form.
        </p>
      </div>
      <div
        className={`mt-2 flex flex-col gap-4 overflow-hidden transition-[max-height]`}
      >
        <TitleInput form={form} />
        <div className="grid gap-2 grid-cols-2">
          <CategorySelect control={form.control} inputName="categoryId" />
          <SubCategorySelect control={form.control} inputName="subCategoryId" />
        </div>
        <FormField
          control={form.control}
          name="isDraft"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Form Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SwitchInput form={form} />
      </div>
    </div>
  );
};

export default FeedbackForm;
