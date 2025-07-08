"use client";

import { ChevronDown, Trash2, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Question } from "@/types";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { IconButton } from "@/components/atoms";

const QuestionsList = ({
  questionsList,
  setQuestionsList,
}: {
  questionsList: Question[];
  setQuestionsList: Dispatch<SetStateAction<Question[] | []>>;
}) => {
  return (
    <div className="flex flex-col gap-10 relative w-full rounded-md outline-muted p-6 outline-2 isolate shadow-sm">
      <TableWithFilter
        // form={CategoryFilterForm}
        noFilter
        title="Questions List"
        tableData={questionsList}
        tableColumn={[
          {
            accessorKey: "text",
            size: 300,
            header: () => <div className="text-nowrap">Question</div>,
            cell: ({ row }: any) => {
              return <p>{row.original.text}</p>;
            },
          },
          {
            accessorKey: "type",
            size: 300,
            header: () => <div className="text-nowrap">Question Type</div>,
            cell: ({ row }: any) => {
              return <p>{row.original.type}</p>;
            },
          },
          {
            accessorKey: "actions",
            header: () => <div className="text-nowrap">Action</div>,
            enableHiding: false,
            cell: ({ row }: any) => {
              return (
                <IconButton bgColor="red" className="cursor-pointer text-white">
                  <span
                    title={"Delete"}
                    onClick={() =>
                      setQuestionsList((prev) =>
                        prev.filter((_) => _?.text !== row.original?.text)
                      )
                    }
                  >
                    <Trash2 size={20} />
                  </span>
                </IconButton>
              );
            },
          },
        ]}
        // tablePagination={true}
        // loading={loading}
        // searchBar
        total={questionsList.length}
        // currentPage={data?.currentPage}
        // pageSize={data?.pageSize}
      />
      {/* <div className="font-semibold text-2xl">Added Questions</div>
            <ChevronDownIcon 
                className={`absolute right-2 top-2 transition-transform ${!open ? "rotate-0" : "rotate-180"}`} 
                onClick={() => setOpen(s => !s)}
            />
            <div className={`flex flex-col gap-4 ${open ? "max-h-[100vh]" : "max-h-0"} w-full overflow-y-hidden transition-[max-height]`}>
                {
                    questionsList.map((question, index) => <QuestionListItem question={question} setQuestionsList={setQuestionsList} index={index} key={index}/>)
                }

            </div> */}
    </div>
  );
};

const QuestionListItem = ({
  question,
  setQuestionsList,
  index,
}: {
  question: Question;
  setQuestionsList: Dispatch<SetStateAction<Question[] | []>>;
  index: number;
}) => {
  const removeQuestion = () => {
    setQuestionsList((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col bg-background outline-2 outline-muted p-4 rounded-md">
      <div className="flex gap-2 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Question Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Preview</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="px-2 py-1 rounded-md text-sm  border border-primary capitalize">
          {question.type.replace("_", " ")}
        </div>
        <div className="self-end ml-auto flex gap-2">
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            onClick={removeQuestion}
          >
            <Trash2Icon />
            Delete
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
      {question.text}
    </div>
  );
};

export default QuestionsList;
