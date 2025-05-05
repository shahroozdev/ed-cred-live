import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationLink } from "../ui/pagination";
import { FilterXIcon, Trash2Icon } from "lucide-react";
import { deleteFeedback, fetchFeedbacks } from "@/api/feedback";
import { Question } from "@/store/questionStore";
import { SubCategory } from "@/store/categoryStore";
import { useRouter } from "next/navigation";

// TODO:factor it out in the common module
export interface Feedback {
    id: string;
    title: string;
    category: Category;
    subcategory: SubCategory;
    status: boolean;
    createdAt: Date;
    author: { username: string };
    details: {
        salary:          boolean;
        schoolName:      boolean;
        schoolWebsite:   boolean;
        schoolCountry:   boolean;
        reportingPeriod: boolean;
        pricipalName:    boolean;
        pricipalDivison: boolean;
        directorName:    boolean;
    };
    questions: Question[];
}

export const RecentFeedback = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    async function loadFeedbacks() {
        const data = await fetchFeedbacks();
        setFeedbacks(data);
    }
    useEffect(() => {
        loadFeedbacks();
    }, []);

    const [filteredStatus, setFilteredStatus] = useState("");
    const [filteredCategory, setFilteredCategory] = useState("");
    const [filteredSubcategory, setFilteredSubcategory] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredFeedbacks = feedbacks.filter(fb => 
        (filteredStatus ? fb.status : true) &&
            (filteredCategory ? fb.category.name === filteredCategory : true) &&
            (filteredSubcategory ? fb.subcategory.name === filteredSubcategory : true) &&
            (search ? fb.title.toLowerCase().includes(search.toLowerCase()) : true)
    );

    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);

    const paginatedFeedbacks = filteredFeedbacks.slice(
        (currentPage - 1) * itemsPerPage, 
        currentPage * itemsPerPage
    );
    const clearFilters = () => {
        setFilteredStatus("");
        setFilteredCategory("");
        setFilteredSubcategory("");
        setSearch("");
        setCurrentPage(1);
    };
    const router = useRouter();

    return (
        <Card className="col-span-4 shadow-none">
            <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Filtering Bar */}
                <div className="flex gap-2 mb-4">
                    <Input placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Select onValueChange={setFilteredCategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Functionality">Functionality</SelectItem>
                            <SelectItem value="Performance">Performance</SelectItem>
                            <SelectItem value="Development">Development</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setFilteredSubcategory}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="UI">UI</SelectItem>
                            <SelectItem value="Features">Features</SelectItem>
                            <SelectItem value="Speed">Speed</SelectItem>
                            <SelectItem value="Bugs">Bugs</SelectItem>
                            <SelectItem value="Accessibility">Accessibility</SelectItem>
                            <SelectItem value="API">API</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setFilteredStatus}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={clearFilters} size={"icon"} variant={"outline"}>
                        <FilterXIcon />
                    </Button>
                </div>

                {/* Table */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Form Category</TableHead>
                            <TableHead>User Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Questions</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedFeedbacks.map((fb, index) => (
                            <TableRow key={index}>
                                <TableCell onClick={() => router.push(`/feedback/${fb.id}`)}>{fb.title}</TableCell>
                                <TableCell>{fb.formCategory?.name ?? "DEPRECATED"}</TableCell>
                                <TableCell>{fb.userCategory?.name ?? "DEPRECATED"}</TableCell>
                                <TableCell className={fb.status ? "text-green-500" : "text-red-500"}>
                                    {fb.status ? "active" : "draft"}
                                </TableCell>
                                <TableCell>{fb.questions.length}</TableCell>
                                <TableCell>
                                    {new Intl.DateTimeFormat("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(fb.createdAt ?? ""))}
                                </TableCell>
                                <TableCell>
                                    <Button variant={"destructive"} size={"icon"} onClick={() => {
                                        deleteFeedback(fb.id)
                                        loadFeedbacks();
                                    }}>
                                        <Trash2Icon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {
                    feedbacks.length >= itemsPerPage &&
                        <div className="flex justify-center mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink 
                                                isActive={currentPage === i + 1} 
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    {totalPages > 5 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext 
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    }
            </CardContent>
        </Card>
    );
};
