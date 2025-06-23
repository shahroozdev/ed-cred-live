"use client"
import { FormFeilds, RatingInput } from "@/components/atoms";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
// import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const QuestionList = ({feedback, disabled}: {feedback: Record<string, any>; disabled?:boolean}) => {
  const { fields, append } = useFieldArray({
    name: "answers",
  });

  return (
    <>
    <h3 className="font-bold text-xl">Questions:</h3>

      {fields.map((field: any, index: number) => {
        const question = feedback?.questions?.find(
          (q: any) => q.id === field.questionId
        );
        if (!question) return null;

        const inputType = question?.type;
        console.log(inputType, 'type')
        return (
          <div
            className={`outline-2 outline-muted flex  ${
              question.type === "rating" ? "md:flex-row flex-col" : "flex-col"
            } w-full justify-between rounded-md p-4`}
            key={`feedback-question-${index}`}
          >
            <p className="mb-2 font-medium md:text-base text-sm">{question?.text}</p>

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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
                      className="border-[1px] border-foreground"
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
