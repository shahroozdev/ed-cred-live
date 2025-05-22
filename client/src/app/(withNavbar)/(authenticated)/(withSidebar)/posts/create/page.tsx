import { TitleWrapper } from "@/components/atoms";
import CreatePost from "@/components/Posts/CreatePost";

const Dashboard = () => {
    return(
    <TitleWrapper title="Create post" desc="">
            <CreatePost />
        </TitleWrapper>
    )
};
export default Dashboard;
