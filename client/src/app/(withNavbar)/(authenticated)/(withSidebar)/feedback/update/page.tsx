// TODO: make this fetch a feedback, populate the fields and then the admin user 
// can update that feedback form

"use client";
import { getProfile } from '@/api/auth';
import { API_BASE_URL } from '@/api/config';
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
    const router = useRouter();
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
            const response = await fetch(`${API_BASE_URL}/feedback-form`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( {
                    title: feedback.title,
                    isDraft: feedback.status === "inactive",
                    categoryId: feedback.category.valueOf(),
                    subCategory: feedback.subcategory,
                    details: feedback.details,
                    authorId: user.id,
                    questions: questions 
                }),
            });

            if (!response.ok) {
                toast.error("Failed to save the feedback");
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
