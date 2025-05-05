import { AskQuestionCard } from "@/components/Forum/AskQuestionCard";
import { RecentQuestions } from "@/components/Forum/RecentQuestions";

const ForumPage = () => {
    return(
        <div className="w-full bg-background text-foreground">
            <AskQuestionCard />
            <RecentQuestions />
        </div>
    )
};

export default ForumPage;
