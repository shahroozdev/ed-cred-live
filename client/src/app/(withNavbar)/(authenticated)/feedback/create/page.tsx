import { TitleWrapper } from "@/components/atoms";
import FeedbackForm from "@/components/pages/admin/feedback/create/FeedbackForm";

// Inside /feedback/create/page.tsx
export const dynamic = 'force-dynamic';

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
