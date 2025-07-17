'use client'
import { DisputeBtn, FormTemplate } from "@/components/atoms";
import QuestionList from "@/components/pages/common/review/components/questionList";
import React from "react";
import Attachments from "./attachments";

const QuestionView = ({ response, userId, category }: { response: Record<string, any>, userId?:number, category?:Record<string, any> }) => {
  return (
    <FormTemplate
      onSubmit={() => {}}
      defaultValues={{
        answers:
          response?.feedbackForm?.questions?.map((q: any, i: number) => ({
            questionId: q.id,
            question: q.text,
            answer: response?.answers[i]?.answer,
          })) ?? [],
      }}
    >
      <div className="p-4 border-t-muted border-solid mx-2 rounded fill-blue-400">
        {userId&&!response?.is_owned && <DisputeBtn id={response?.id} disabled={response?.is_disputed}/>}
        <QuestionList feedback={response?.feedbackForm} disabled  category={category}/>
        <Attachments attachments={response?.attachments}/>
      </div>
    </FormTemplate>
  );
};

export default QuestionView;
