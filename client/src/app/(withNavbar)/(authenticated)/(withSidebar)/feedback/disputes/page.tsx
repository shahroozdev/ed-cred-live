import { Header } from "@/components/ManageUsers/Header";
import { DisputesTable } from "@/components/Dispute/DisputeTable";

const FeedbackDisputePage = () => {
    return (
        <main className="w-full min-h-screen">
            <Header title="Manage Disputes" description="manage feedback disputes here."/>
            <div className="w-full mx-auto px-10 mt-10">
                <DisputesTable />
            </div>
        </main>
    )
}
export default FeedbackDisputePage;
