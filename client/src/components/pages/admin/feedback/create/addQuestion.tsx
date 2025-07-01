import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AppleIcon, CheckIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { QuestionFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Question } from "@/types";
import { Button } from "@/components/atoms";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";


const MultipleChoiceInput = ({ form }: { form: UseFormReturn<z.infer<typeof QuestionFormSchema>> }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options"
    });

    const options = form.watch("options");

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
                <Label>Options</Label>
                <div className="self-end flex gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e:any) => {
                            e.preventDefault();
                            if (fields.length > 2) remove(fields.length - 1);
                        }}
                    >
                        <MinusIcon stroke="black" />
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e:any) => {
                            e.preventDefault();
                            append({ value: "" })
                        }}
                    >
                        <PlusIcon stroke="black" />
                    </Button>
                </div>
            </div>

             {fields.map((_, i) => (
                <Input
                    key={i}
                    onChange={(e: any) => form.setValue(`options.${i}.value`, e.target.value)}
                    className="border p-2 rounded w-full mt-1"
                    placeholder={`Option ${i + 1}`}
                    maxLength={50}
                    required={i < 2}
                />
            ))}

            <Label className="block mt-2">Correct Answer</Label>
            <Select
                onValueChange={(value) => form.setValue("answer", value)}
                value={String(form.getValues("answer"))}
            >
                <SelectTrigger className="border p-2 rounded w-full">
                    <SelectValue placeholder="Select the correct answer" />
                </SelectTrigger>
                <SelectContent>
                    {options && options.map((option, i) => (
                        <SelectItem key={i} value={option.value || `Option ${i + 1}`}>
                            {option.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
const AddQuestion = ({
  setQuestionsList,
}: {
  setQuestionsList: Dispatch<SetStateAction<Question[] | []>>;
}) => {
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      text: "",
      type: "rating",
    },
  });
  const questionType = form.watch("type");

  const onSubmit = (data: any) => {
    console.log(data);
    setQuestionsList((prev) => [...prev, data]);
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 rounded-md outline-muted p-6 outline-2 isolate shadow-sm"
      >
        <div className="">
          <div className="text-2xl font-semibold">Questions</div>
          <p className="text-muted-foreground mb-4 text-sm">
            Ask the users questions.
          </p>
        </div>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder="Ask a question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Question Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="multiple_choice">
                    Multiple Choice
                  </SelectItem>
                  <SelectItem value="true_false">True/False</SelectItem>
                  <SelectItem value="open_ended">Open Ended</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          {questionType === "multiple_choice" ? (
            <MultipleChoiceInput form={form} />
          ):(questionType === "rating" || questionType === "open_ended") ? (<></>
          ):<div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Rating Options</FormLabel>
                    <Select onValueChange={field.onChange} value={String(field.value)}>
                      <SelectTrigger className="border p-2 rounded w-full">
                        <SelectValue placeholder="Select a options" />
                      </SelectTrigger>
                      {questionType === "true_false" ? (
                        <SelectContent>
                          <SelectItem value="true">
                            <CheckIcon />
                            True
                          </SelectItem>
                          <SelectItem value="false">
                            <XIcon />
                            False
                          </SelectItem>
                        </SelectContent>
                      ) : (
                        <></>
                      )}
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>}
          {questionType === "open_ended" && <div></div>}
        </div>
        <Button
          icon={<PlusIcon />}
          variant={"primary"}
          type="submit"
          //   disabled={!form.formState.isValid}
        >
          Add Question
        </Button>
      </form>
    </Form>
  );
};

export default AddQuestion;
