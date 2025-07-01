"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ArrowUpFromLineIcon } from "lucide-react";
import {
  Button,
  CategorySelect2,
  FormFeilds,
  FormTemplate,
} from "@/components/atoms";
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
import { Input } from "@/components/ui/input";
import SubCategorySelect2 from "@/components/atoms/subCategorySelect/index2";

const FeedbackForm = ({data, setIsOpen}: {data?: Record<string, any>, setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { MutateFunc, isPending } = useMutate();
  const [questionsList, setQuestionsList] = useState<Question[] | []>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(()=>{
    if(data){
      setQuestionsList(data?.questions)
    }
  },[data])
  const onSubmit = async (values: z.infer<typeof GeneralFormSchema>) => {
    if (questionsList?.length < 1) {
      setIsError(true);
      return;
    }
    setIsError(false);
    await MutateFunc({
      url: "/feedback-form",
      method: "POST",
      body: {
        ...(data?.id?{id:data?.id}:{}),
        ...values,
        isDraft: values?.isDraft === "active" ? false : true,
        subCategoryId: Number(values?.subCategoryId),
        categoryId: Number(values?.categoryId),
        questions: questionsList,
      },
      sendTo: "/feedback",
      onSuccess: () => {
        setIsOpen && setIsOpen(false);
      }
    });
  };


  return (
    <div className="flex flex-col gap-5 items-center justify-between">
      <FormTemplate
        onSubmit={onSubmit}
        schema={GeneralFormSchema}
        defaultValues={{
          title: data?.title||"",
          categoryId: data?.category?.id?.toString()||"",
          subCategoryId: data?.subcategory?.id?.toString()||"",
          isDraft: data?.isDraft?"inactive":"active",
          questions: questionsList,
        }}
        className="flex w-full flex-col items-start justify-between gap-10"
      >
        <MetaDataInput />
        {isError && (
          <p className="text-red-500">
            At least one question must be provided.
          </p>
        )}
        <Button
          icon={<ArrowUpFromLineIcon />}
          variant={"primary"}
          className="w-full font-normal"
          type="submit"
          loading={isPending}
        >
          Publish Feedback
        </Button>
      </FormTemplate>
      <AddQuestion setQuestionsList={setQuestionsList} />
      <QuestionsList
        questionsList={questionsList}
        setQuestionsList={setQuestionsList}
      />
    </div>
  );
};

const MetaDataInput = () => {
  return (
    <div className="outline-muted relative flex w-full flex-col gap-4 rounded-md p-6 outline-2 isolate shadow-sm">
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
        <FormFeilds fieldProps={{ name: "title" }} label={{ text: "Title" }}>
          {(field) => (
            <Input
              placeholder="Enter feedback title"
              {...field}
              value={field.value}
              onChange={field.onChange}
              maxLength={100}
            />
          )}
        </FormFeilds>
        <div className="grid gap-2 grid-cols-2">
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
        </div>
        <FormFeilds
          fieldProps={{ name: "isDraft" }}
          label={{ text: "Form Status" }}
        >
          {(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          )}
        </FormFeilds>
      </div>
    </div>
  );
};

export default FeedbackForm;
