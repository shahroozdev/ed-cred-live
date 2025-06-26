"use client";
import PublishFeedback from "@/components/pages/admin/feedback/create/publishedBtn";
import { TitleWrapper } from "@/components/atoms";
import FeedbackForm from "@/components/pages/admin/feedback/create/FeedbackForm";
import QuestionsList from "@/components/pages/admin/feedback/create/QuestionsList";

const Dashboard = () => {
  return (
    <TitleWrapper
      title="Create Feedback Form"
      desc="You can create a feedback form. The category refers to the added and the subcategory refers to the users role."
    >
      <div className="w-full mt-10">
        <FeedbackForm />
      </div>
    </TitleWrapper>
  );
};

export default Dashboard;
