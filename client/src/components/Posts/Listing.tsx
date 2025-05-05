import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { usePostStore } from "@/store/usePostStore";
import { Search, XCircle, Trash2, Star, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PostsListing() {
    const { posts, fetchPosts, removePost } = usePostStore(); 
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, []);

    // Pagination
    const postsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // Filters
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | "active" | "draft">("all");
    const [featured, setFeatured] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Filtered Posts
    const filteredPosts = posts.filter(post => {
        return (
            (status === "all" || post.status === status) &&
                (!featured || post.featured) &&
                (post.title.toLowerCase().includes(search.toLowerCase()) || post.description.toLowerCase().includes(search.toLowerCase()))
        );
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // Clear Filters
    const clearFilters = () => {
        setSearch("");
        setStatus("all");
        setFeatured(false);
        setCurrentPage(1);
    };

    // Handle Delete
    const handleDelete = (id: string) => {
        removePost(id);
        toast.success("Post deleted successfully");
        setDeleteId(null);
    };

    return (
        <div className="">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center mb-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>

                <Select onValueChange={(value) => setStatus(value as "all" | "active" | "draft")} value={status}>
                    <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                    <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked as boolean)} />
                    <label htmlFor="featured" className="text-sm">Featured</label>
                </div>

                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Clear Filters
                </Button>
            </div>

            {/* Post List */}
            {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                    <div 
                        key={post.id}
                        className="flex items-center justify-between border-b pb-4 hover:bg-foreground/2 py-4 px-2 rounded-md" 
                    >
                        <div className="flex flex-col">
                            <p className="text-base font-medium leading-none">{post.title}</p>
                            <p className="text-sm text-muted-foreground w-3/4 my-2 line-clamp-1 text-ellipsis">{post.description}</p>
                            <div className="text-sm text-gray-500 space-x-2">
                                <span>
                                    {new Intl.DateTimeFormat("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(post.createdAt ?? ""))}
                                </span>
                                <span 
                                    className={`font-medium ${post.status === 'active' ? 'text-green-600' : post.status === 'draft' ? 'text-yellow-600' : 'text-gray-400'}`}>
                                    {post.status}</span>
                            </div>
                        </div>


                        <div className="flex items-center gap-2">
                            <button onClick={() => {}}>
                                <Star className={`w-5 h-5 ${post.featured ? "text-yellow-500 fill-yellow-500" : "hidden"}`} />
                            </button>

                            <Button onClick={() => router.push(`/posts/${post.id}`)} size={"icon"} variant={"secondary"}>
                                <ExternalLinkIcon className="w-5 h-5 text-black hover:text-blue-700" />
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button onClick={() => setDeleteId(post.id ?? "")} size={"icon"} variant={"destructive"}>
                                        <Trash2 className="w-5 h-5 dark:text-red-500 hover:text-red-700" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. Do you want to delete this post?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(deleteId!)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))
            ) : (
                    <p className="text-center text-gray-500">No posts found.</p>
                )}

            {/* Pagination */}
            {totalPages > 1 && (
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
            )}
        </div>
    );
}
