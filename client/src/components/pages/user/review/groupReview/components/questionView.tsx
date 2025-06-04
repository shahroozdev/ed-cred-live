'use client'
import { FormTemplate } from "@/components/atoms";
import QuestionList from "@/components/pages/common/review/components/questionList";
import React from "react";

const QuestionView = ({ response }: { response: Record<string, any> }) => {
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
      <div className="p-4 border-t-muted bg-gray-200 mx-2 rounded">
        <h3 className="text-xl font-semibold mb-4">Questions:</h3>
        <QuestionList feedback={response?.feedbackForm} disabled />
      </div>
    </FormTemplate>
  );
};

export default QuestionView;
