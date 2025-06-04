import React from "react";
import ResponseCard from "../../dashboard/components/responseCard";
import FilterDrawer from "../../dashboard/components/filterDrawer";
import CustomAccordion from "@/components/atoms/accordian";
import ResponseView from "./components/responseView";
import QuestionView from "./components/questionView";

const GroupedResponseView = ({data}:{data:Record<string, any>}) => {
    const items =
    data?.responses?.length > 0
      ? data?.responses?.map((item: Record<string, any>) => ({
          title: <ResponseView response={item} />,
          desc: <QuestionView response={item} />,
        }))
      : [];
  return (
    <>
      <ResponseCard response={data} />
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold my-4">Responses List:</h3>{" "}
        <FilterDrawer />
      </div>
      <div className="border-2 border-muted rounded-md p-4">
        <CustomAccordion
          items={items}
          className=" border-2 border-muted rounded-md mb-2 shadow-md hover:scale-101 transition-all duration-300 ease-in-out space-y-3"
        />
      </div>
    </>
  );
};

export default GroupedResponseView;
