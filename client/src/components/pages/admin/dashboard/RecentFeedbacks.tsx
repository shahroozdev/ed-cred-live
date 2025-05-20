'use client'
import { useEffect, useState } from "react";
import { deleteFeedback, fetchFeedbacks } from "@/api/feedback";
import { Question } from "@/store/questionStore";
import { SubCategory } from "@/store/categoryStore";
import { useRouter } from "next/navigation";
import { Category } from "@/types/user";
import { feedbacksDashboardColumn } from "@/data/tableColumns";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { useQuery } from "@/hooks/generalHooks";
import { FeedbackFilterForm } from "@/data/forms";

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
    salary: boolean;
    schoolName: boolean;
    schoolWebsite: boolean;
    schoolCountry: boolean;
    reportingPeriod: boolean;
    pricipalName: boolean;
    pricipalDivison: boolean;
    directorName: boolean;
  };
  questions: Question[];
}

export const RecentFeedback = () => {
    const { data, isLoading, error } = useQuery({
      url: "/feedback-form",
      key: "feedbacks",
    });
console.log(data)
  return (
      <div className="col-span-2">
      <TableWithFilter
        form={FeedbackFilterForm}
        // noFilter
        title="Recent Feedback"
        tableData={data}
        tableColumn={feedbacksDashboardColumn}
        tablePagination={true}
        loading={isLoading}
        searchBar
      />
      </div>
    //     <CardHeader>
    //       <CardTitle>Recent Feedback</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       {/* Filtering Bar */}
    //       <div className="flex gap-2 mb-4">
    //         <Input
    //           placeholder="Search title..."
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <Select onValueChange={setFilteredCategory}>
    //           <SelectTrigger className="w-[150px]">
    //             <SelectValue placeholder="Category" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="Design">Design</SelectItem>
    //             <SelectItem value="Functionality">Functionality</SelectItem>
    //             <SelectItem value="Performance">Performance</SelectItem>
    //             <SelectItem value="Development">Development</SelectItem>
    //           </SelectContent>
    //         </Select>
    //         <Select onValueChange={setFilteredSubcategory}>
    //           <SelectTrigger className="w-[150px]">
    //             <SelectValue placeholder="Subcategory" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="UI">UI</SelectItem>
    //             <SelectItem value="Features">Features</SelectItem>
    //             <SelectItem value="Speed">Speed</SelectItem>
    //             <SelectItem value="Bugs">Bugs</SelectItem>
    //             <SelectItem value="Accessibility">Accessibility</SelectItem>
    //             <SelectItem value="API">API</SelectItem>
    //           </SelectContent>
    //         </Select>
    //         <Select onValueChange={setFilteredStatus}>
    //           <SelectTrigger className="w-[150px]">
    //             <SelectValue placeholder="Status" />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="active">Active</SelectItem>
    //             <SelectItem value="inactive">Inactive</SelectItem>
    //           </SelectContent>
    //         </Select>
    //         <Button onClick={clearFilters} size={"icon"} variant={"outline"}>
    //           <FilterXIcon />
    //         </Button>
    //       </div>

    //       {/* Table */}
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Title</TableHead>
    //             <TableHead>Category</TableHead>
    //             <TableHead>Subcategory</TableHead>
    //             <TableHead>Status</TableHead>
    //             <TableHead>Questions</TableHead>
    //             <TableHead>Date</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {paginatedFeedbacks.map((fb, index) => (
    //             <TableRow key={index}>
    //               <TableCell onClick={() => router.push(`/feedback/${fb.id}`)}>
    //                 {fb.title}
    //               </TableCell>
    //               <TableCell>{fb.category.name}</TableCell>
    //               <TableCell>{fb.subcategory && fb.subcategory.name}</TableCell>
    //               <TableCell
    //                 className={fb.status ? "text-green-500" : "text-red-500"}
    //               >
    //                 {fb.status ? "active" : "draft"}
    //               </TableCell>
    //               <TableCell>{fb.questions.length}</TableCell>
    //               <TableCell>
    //                 {new Intl.DateTimeFormat("en-US", {
    //                   day: "numeric",
    //                   month: "long",
    //                   year: "numeric",
    //                 }).format(new Date(fb.createdAt ?? ""))}
    //               </TableCell>
    //               <TableCell>
    //                 <Button
    //                   variant={"destructive"}
    //                   size={"icon"}
    //                   onClick={() => {
    //                     deleteFeedback(fb.id);
    //                     loadFeedbacks();
    //                   }}
    //                 >
    //                   <Trash2Icon />
    //                 </Button>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>

    //       {/* Pagination */}
    //       {feedbacks.length >= itemsPerPage && (
    //         <div className="flex justify-center mt-4">
    //           <Pagination>
    //             <PaginationContent>
    //               <PaginationItem>
    //                 <PaginationPrevious
    //                   onClick={() =>
    //                     setCurrentPage((prev) => Math.max(prev - 1, 1))
    //                   }
    //                   // disabled={currentPage === 1}
    //                 />
    //               </PaginationItem>

    //               {Array.from({ length: totalPages }, (_, i) => (
    //                 <PaginationItem key={i}>
    //                   <PaginationLink
    //                     isActive={currentPage === i + 1}
    //                     onClick={() => setCurrentPage(i + 1)}
    //                   >
    //                     {i + 1}
    //                   </PaginationLink>
    //                 </PaginationItem>
    //               ))}

    //               {totalPages > 5 && (
    //                 <PaginationItem>
    //                   <PaginationEllipsis />
    //                 </PaginationItem>
    //               )}

    //               <PaginationItem>
    //                 <PaginationNext
    //                   onClick={() =>
    //                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    //                   }
    //                   // disabled={currentPage === totalPages}
    //                 />
    //               </PaginationItem>
    //             </PaginationContent>
    //           </Pagination>
    //         </div>
    //       )}
    //     </CardContent>
    //   </Card>
    // </>
  );
};
