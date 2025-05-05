"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationLink } from "../ui/pagination";
import { FilterXIcon, Trash2Icon } from "lucide-react";
import { useSubCategoryStore } from "@/store/categoryStore";

export const SubCategoryTable = () => {
    const [filteredStatus, setFilteredStatus] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    const { categories, removeCategory, fetchCategories } = useSubCategoryStore();
    useEffect(() => {
        fetchCategories();
    }, []);

    // Filtering logic
    const filteredCategories = categories.filter((cat) =>
        (filteredStatus ? cat.status === filteredStatus : true) &&
        (search ? cat.name.toLowerCase().includes(search.toLowerCase()) : true)
    );

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    // Pagination logic
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const clearFilters = () => {
        setFilteredStatus("");
        setSearch("");
        setCurrentPage(1);
    };

    return (
        <div className="ring-2 ring-muted rounded-md p-4">
            <div className="font-semibold text-xl mb-4">Recent Categories</div>
            {/* Filtering Bar */}
            <div className="flex gap-2 mb-4">
                <Input placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
                        <TableHead>Sub Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Parent Category</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedCategories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell className={category.status === "active" ? "text-green-500" : "text-red-500"}>
                                {category.status}
                            </TableCell>
                            <TableCell className="">
                                {new Intl.DateTimeFormat("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }).format(new Date(category.createdAt ?? ""))}
                            </TableCell>
                            <TableCell>{category.parentCategory.name}</TableCell>
                            <TableCell className="text-right self-end w-10">
                            <div className="flex gap-2 w-max">
                                <Button 
                                        variant={"destructive"}
                                        size={"sm"}
                                        onClick={() => removeCategory(category.id ?? 0)}
                                    >
                                        <Trash2Icon />
                                    </Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            {
                categories.length > itemsPerPage &&
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
        </div>
    );
};
