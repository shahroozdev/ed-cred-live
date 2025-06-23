'use client'
import { useRouter } from "next/navigation";

export function RecentPosts({posts}:{posts:Record<string, any>}) {

    const router = useRouter();

    return (
        <div className="">
            {
                posts?.length > 0 ? 
                    (<>
                        {
                            posts?.map((post:any, index:number) => (
                                <div
                                    key={index}
                                    className="flex flex-col space-y-1 border-b pb-4 hover:bg-foreground/2 py-4 px-2 rounded-md select-none cursor-pointer"
                                    onClick={() => router.push("/posts")}
                                >
                                    <p className="text-sm font-medium leading-none">{post.title}</p>
                                    {/* <HTMLContent value={post?.body} className="line-clamp-2 !p-0 h-auto"/> */}
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
                    </>) : 
                    <p className="text-center text-gray-500">No posts found.</p>
            }
        </div>
    );
}
