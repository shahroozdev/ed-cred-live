import { TitleWrapper } from "@/components/atoms";
import FeedbackFormCreateEdit from "@/components/pages/admin/feedback/create/FeedbackFormCreateEdit";

// Inside /feedback/create/page.tsx
// export const dynamic = 'force-dynamic';

const CreateFeedback = () => {
  return (
    <TitleWrapper
      title="Create Feedback Form"
      desc="You can create a feedback form. The category refers to the added and the subcategory refers to the users role."
    >
      <div className="w-full mt-10">
        <FeedbackFormCreateEdit />
      </div>
    </TitleWrapper>
  );
};

export default CreateFeedback;
