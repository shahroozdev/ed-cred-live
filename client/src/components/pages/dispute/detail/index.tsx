import React from "react";
import ResponseView from "../../user/review/groupReview/components/responseView";
import CustomAccordion from "@/components/atoms/accordian";
import QuestionView from "../../user/review/groupReview/components/questionView";
import Timeline from "./components/timeline";

const DisputeDetail = ({ data , role}: { data: Record<string, any>, role:string }) => {

  return (
    <div>
      <CustomAccordion
        items={[
          {
            title: <ResponseView response={data?.feedbackResponse} />,
            desc: <QuestionView response={data?.feedbackResponse} />,
          },
        ]}
        className=" border-2 border-muted rounded-md mb-2 shadow-md hover:scale-101 transition-all duration-300 ease-in-out space-y-3"
      />
      <Timeline timelineData={data} role={role}/>
    </div>
  );
};

export default DisputeDetail;
