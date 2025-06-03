"use client"
import { FormFeilds, RatingInput } from "@/components/atoms";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
// import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const QuestionList = ({feedback}: {feedback: Record<string, any>;}) => {
  const { fields, append } = useFieldArray({
    name: "answers",
  });
  // useEffect(() => {
  //   if (feedback?.questions) {
  //     feedback?.questions.forEach((q: any) => {
  //       if (!fields.find((f: any) => f.questionId === q.id)) {
  //         append({ questionId: q?.id, answer: "", question: q?.text });
  //       }
  //     });
  //   }
  // }, [feedback?.questions?.length]);
  // console.log(feedback, 'feedback')
  return (
    <>
      {fields.map((field: any, index: number) => {
        const question = feedback.questions.find(
          (q: any) => q.id === field.questionId
        );
        if (!question) return null;

        const inputType = question.type;

        return (
          <div
            className={`outline-2 outline-muted flex ${
              question.type != "rating" ? "flex-col" : ""
            } w-full justify-between rounded-md p-4`}
            key={`feedback-question-${index}`}
          >
            <p className="mb-2 font-medium">{question?.text}</p>

            <FormFeilds
              key={field.id}
              fieldProps={{ name: `answers.${index}.answer`, className: "" }}
            >
              {(fieldProps) => {
                if (inputType === "rating") {
                  return (
                    <RatingInput
                      color="red"
                      //@ts-ignore
                      value={fieldProps.value ?? ""}
                      onChange={fieldProps.onChange}
                    />
                  );
                } else if (
                  inputType === "multiple_choice" ||
                  inputType === "true_false"
                ) {
                  return (
                    <RadioGroup
                      //@ts-ignore
                      value={fieldProps.value ?? ""}
                      onValueChange={fieldProps.onChange}
                    >
                      {question.options.map((opt: any, idx: number) => (
                        <Label key={idx} className="flex items-center gap-2">
                          <RadioGroupItem value={opt.value} />
                          {opt.value}
                        </Label>
                      ))}
                    </RadioGroup>
                  );
                } else if (inputType === "open_ended") {
                  return (
                    <Textarea
                      //@ts-ignoreS
                      value={fieldProps.value ?? ""}
                      onChange={fieldProps.onChange}
                      placeholder="Your answer"
                    />
                  );
                }
                return null;
              }}
            </FormFeilds>
          </div>
        );
      })}
    </>
  );
};

export default QuestionList;
