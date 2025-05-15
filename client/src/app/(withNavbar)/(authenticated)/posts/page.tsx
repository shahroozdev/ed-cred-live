"use client";
import { usePostStore } from "@/store/usePostStore";
import { PostsListing } from "@/components/Posts/Listing";
import { Stats } from "@/components/Common/Stats";
import { Title } from "@/components/Common/Title";
import { PromoCard } from "@/components/Common/PromoCard";

const PostListingPage = () => {
    return(
        <div className="font-inter w-4xl mx-auto flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Title
                    title="Recent posts"
                    desc=""
                 />
                <PromoCard
                    title="Create a post"
                    desc="posts are great way to communitcate with other people about our ideas"
                    cta="create"
                 />
                <StatsComponent />
                <PostsListing />
            </div>
        </div>
    )
};

const StatsComponent = () => {
    const { posts } = usePostStore();

    const stats = [
        {
            title: "Total Posts",
            value: posts.length.toString(),
        },
        {
            title: "Active Posts",
            value: posts.filter(post => post.status === "active").length.toString(),
        },
        {
            title: "Featured Posts",
            value: posts.filter(post => post.featured).length.toString(),
        },
    ];

    return <Stats stats={stats} />
}

export default PostListingPage;
