import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { OverviewTab } from "@/components/pages/admin/dashboard/Overview";


const Dashboard = async({ searchParams }: { searchParams: any }) => {
    const params = await searchParams;
    const queryParams = new URLSearchParams(params);
    const feedbacks = await getServerSideDataWithFeatures({url:`/feedback-form?${queryParams.toString()}`, key:'feedbacksFormList'})
    const categories = await getServerSideDataWithFeatures({url:`/category`, key:'CategoriesList'})
    return (
        <div className="font-inter flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OverviewTab feedbacks={feedbacks} categories={categories}/>
            </div>
        </div>
    )
};
export default Dashboard;
