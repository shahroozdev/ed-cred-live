import { OverviewTab } from "@/components/pages/admin/dashboard/Overview";


const Dashboard = () => {

    return (
        <div className="font-inter flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OverviewTab />
            </div>
        </div>
    )
};
export default Dashboard;
