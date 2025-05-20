"use client";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  QuestionInput,
  StatusInput,
  SwitchInput,
  TitleInput,
  QuestionSelectInput,
  QuestionTypeInput,
} from "../FeedbackElements";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ArrowUpFromLineIcon, ChevronDownIcon } from "lucide-react";
import { Button, CategorySelect, SubCategorySelect } from "@/components/atoms";
import { GeneralFormSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import { Question } from "@/types";
import AddQuestion from "./addQuestion";
import QuestionsList from "./QuestionsList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FeedbackForm = () => {
  const { MutateFunc, isPending } = useMutate();
  const [questionsList, setQuestionsList] = useState<Question[] | []>([]);
  //   const { questions } = useQuestionStore();
  // const questionForm = useForm<z.infer<typeof QuestionFormSchema>>({
  //   resolver: zodResolver(QuestionFormSchema),
  //   defaultValues: {
  //     text: "",
  //     type: "rating",
  //   },
  // });

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
    console.log({
      ...data,
      subCategoryId: Number(data?.subCategoryId),
      categoryId: Number(data?.categoryId),
      questions: questionsList,
    });
    await MutateFunc({
      url: "/feedback-form",
      method: "POST",
      body: {
        ...data,
        isDraft:data?.isDraft==="active"?false:true,
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
          {/* <div className="flex w-full flex-col gap-4 rounded-md outline-muted p-6 outline-2 isolate shadow-sm">
            <div className="">
              <div className="text-2xl font-semibold">Questions</div>
              <p className="text-muted-foreground mb-4 text-sm">
                Ask the users questions.
              </p>
            </div>
            <QuestionSelectInput form={questionForm} />
            <QuestionTypeInput form={questionForm} />
            <QuestionInput form={questionForm} />
            <AddQuestion form={questionForm} />
          </div> */}
        </form>
      </Form>
      <AddQuestion setQuestionsList={setQuestionsList} />
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
        <Button
          icon={<ArrowUpFromLineIcon />}
          variant={"primary"}
          className="w-full font-normal"
          type="submit"
          loading={loading}
        >
          Publish Feedback
        </Button>
      </div>
    </div>
  );
};

const SubmitButton = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof GeneralFormSchema>>;
}) => {
  const { MutateFunc, isPending } = useMutate();
  const handleFeedbackSave = async () => {
    const data = form.getValues();
    const feedback: any = {
      id: uuidv4(),
      ...data,
    };
    await MutateFunc({ url: "", method: "POST", body: feedback });
    // toast("Feedback Saved successfully!");
  };
  return (
    <Button
      disabled={!form.formState.isValid}
      onClick={handleFeedbackSave}
      className="mt-2"
    >
      Save Metadata
    </Button>
  );
};

export default FeedbackForm;
