"use client";
import { getProfile } from '@/api/auth';
import { postRequest } from '@/api/config';
import FeedbackForm from '@/components/Dashboard/FeedbackForm';
import QuestionsList from '@/components/Dashboard/QuestionsList';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useFeedbackStore } from '@/store/createFeedbackStore';
import { useQuestionStore } from '@/store/questionStore';
import { ArrowUpFromLineIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Title } from '@/components/Common/Title';

const Dashboard = () => {
    return (
        <ProtectedRoute>
            <div className="bg-background font-inter relative flex flex-col overflow-x-hidden">
                {/* <Route route={["feedback", "create feedback"]} /> */}
                <div className='w-2xl mx-auto mt-10 h-auto max-w-2xl'>
                    <Title
                        title='Create Feedback Form'
                        desc='You can create a feedback form. The category refers to the added and the subcategory refers to the users role.'
                    />
                    <FeedbackForm />
                    <QuestionsList />
                    <PublishFeedback />
                </div>
            </div>
        </ProtectedRoute>
    )
};

const PublishFeedback = () => {
    const router = useRouter();
    const { questions } = useQuestionStore();
    const { feedback, resetFeedback } = useFeedbackStore();

    const sendFeedback = async() => {
        try {
            const user = await getProfile();
            if (!feedback || questions.length < 2) {
                return;
            }
            const response = await postRequest(`feedback-form`, 
                JSON.stringify({
                    title: feedback.title,
                    isDraft: feedback.status === "inactive",

                    formCategoryId: feedback.formCategoryId.valueOf(),
                    userCategoryId: feedback.userCategoryId.valueOf(),

                    details: feedback.details,
                    authorId: user.id,
                    questions: questions,
                }),
            );
            console.log(response);

            if (response.error) {
                toast.error(response.message);
                return;
            }

            resetFeedback();
            router.push("/feedback");
        } catch (error) {
            toast(`Error saving the feedback: ${error}`);
            console.error("Error sending questions:", error);
        }
    }

    return (
        <Button 
            variant={"default"} 
            className="mb-10 w-full font-normal" 
            onClick={sendFeedback}
        >
            <ArrowUpFromLineIcon />
            Publish Feedback
        </Button>
    )
}

export default Dashboard;
