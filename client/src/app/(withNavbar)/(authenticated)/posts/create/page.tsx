"use client";
import { Title } from "@/components/Common/Title";
import CreatePost from "@/components/Posts/CreatePost";

const Dashboard = () => {
    return(
        <div className="font-inter flex flex-col mx-auto w-4xl mt-10">
            <Title
                title="Create Post"
                desc=""
            />
            <CreatePost />
        </div>
    )
};
export default Dashboard;
