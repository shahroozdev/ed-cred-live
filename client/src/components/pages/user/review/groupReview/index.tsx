import React from "react";
import ResponseCard from "../../dashboard/components/responseCard";
// import FilterDrawer from "../../dashboard/components/filterDrawer";
import CustomAccordion from "@/components/atoms/accordian";
import ResponseView from "./components/responseView";
import QuestionView from "./components/questionView";
import { Separator } from "@/components/ui/separator";

const GroupedResponseView = ({
  data,
  related,
  userId
}: {
  data: Record<string, any>;
  related: Record<string, any>;
  userId:number;
}) => {

  const items =
    data?.responses?.length > 0
      ? data?.responses?.map((item: Record<string, any>) => ({
          title: <ResponseView response={item} category={data?.category?.name}/>,
          desc: <QuestionView response={item} userId={userId} category={data?.category?.name}/>,
        }))
      : [];
  return (
    <section className="md:grid flex flex-col md:grid-cols-5 gap-4">
      <div className="lg:col-span-4 col-span-3">
        <ResponseCard response={data} />
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold my-4">Responses List:</h3>{" "}
          {/* <FilterDrawer /> */}
        </div>
        <div className="border-2 border-muted border-solid rounded-md p-4">
          <CustomAccordion
            items={items}
            className=" border-2 border-muted border-solid rounded-md mb-2 shadow-md hover:scale-101 transition-all duration-300 ease-in-out space-y-3"
          />
        </div>
      </div>
      <div className="rounded-xl shadow-md lg:col-span-1 col-span-2 p-2">
        <h2 className="py-2 font-bold">Related Reviews</h2>
        <Separator className="mb-2"/>
        <div className="space-y-2">
        {related?.branches?.flatMap((employees: Record<string, any>) => employees?.employees)
          ?.map((review: Record<string, any>, i: number) => (
            <ResponseCard response={review} key={i} mobile noImage/>
          ))}
          </div>
      </div>
    </section>
  );
};

export default GroupedResponseView;
