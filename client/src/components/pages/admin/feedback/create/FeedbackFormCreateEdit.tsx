"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ArrowUpFromLineIcon } from "lucide-react";
import { Button, FormTemplate} from "@/components/atoms";
import { GeneralFormSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import { Question } from "@/types";
import AddQuestion from "./addQuestion";
import QuestionsList from "./QuestionsList";
import { MetaDataInput } from "../FeedbackElements";

const FeedbackFormCreateEdit = ({data, setIsOpen}: {data?: Record<string, any>, setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>}) => {
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

export default FeedbackFormCreateEdit;
