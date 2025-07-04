import { TitleWrapper } from "@/components/atoms";
import CreatePost from "@/components/pages/common/Posts/CreatePost";

export const dynamic = 'force-dynamic';
const Dashboard = () => {
    return(
    <TitleWrapper title="Create post" desc="">
            <CreatePost />
        </TitleWrapper>
    )
};
export default Dashboard;
