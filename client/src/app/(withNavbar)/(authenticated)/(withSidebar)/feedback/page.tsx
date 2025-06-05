import { Stats } from "@/components/Common/Stats";
import { RecentFeedback } from "@/components/pages/admin/dashboard/RecentFeedbacks";
import { TitleWrapper } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";


export default async function FeedbacksPage({ searchParams }: { searchParams: any }) {
    const params = await searchParams;
    const queryParams = new URLSearchParams(params);
    const data = await getServerSideDataWithFeatures({url:`/feedback-form?${queryParams.toString()}`, key:'feedbacksFormList'})

    const feedbacks = data?.feedbacks;
    const stats = [
        {
            title: "Total feedbacks",
            value: feedbacks?.length.toString(),
        }, 
        {
            title: "Active Feedbacks",
            value: data?.activeCount,
        }
    ];

    return (
        <TitleWrapper  title="Feedbacks" desc="Here are the recent feedback forms. You can go here to create a new feedback form.">
            <Stats stats={stats}/>
            <RecentFeedback data={data}/>
        </TitleWrapper>
    );
}
