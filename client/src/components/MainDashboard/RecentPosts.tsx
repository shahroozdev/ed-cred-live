import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { usePostStore } from "@/store/usePostStore";
import { useRouter } from "next/navigation";

export function RecentPosts() {
    const { posts, fetchPosts } = usePostStore(); 
    useEffect(() => {
        fetchPosts();
    }, []);

    const postsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginatedPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
    const router = useRouter();

    return (
        <div className="">
            {
                paginatedPosts.length > 0 ? 
                    (<>
                        {
                            paginatedPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col space-y-1 border-b pb-4 hover:bg-foreground/2 py-4 px-2 rounded-md select-none"
                                    onClick={() => router.push("/posts")}
                                >
                                    <p className="text-sm font-medium leading-none">{post.title}</p>
                                    <p className="text-sm text-muted-foreground">{post.description}</p>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>
                                            {new Intl.DateTimeFormat("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }).format(new Date(post.createdAt ?? ""))}
                                        </span>
                                        <span className={`font-medium ${post.status === 'active' ? 'text-green-600' : post.status === 'draft' ? 'text-yellow-600' : 'text-gray-400'}`}>{post.status}</span>
                                    </div>
                                </div>
                            ))}
                        {/* Pagination */}
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href="#" onClick={() => setCurrentPage(i + 1)}>{i + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext href="#" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>) : 
                    <p className="text-center text-gray-500">No posts found.</p>
            }
        </div>
    );
}
