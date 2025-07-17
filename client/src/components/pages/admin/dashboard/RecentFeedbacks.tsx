"use client";
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
import FilterFormDashboard from "./filterForm";

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

export const RecentFeedback = ({ data }: { data: Record<string, any> }) => {

  return (
    <div className="col-span-2">
      <TableWithFilter
        formComponent={<FilterFormDashboard/>}
        title="Recent Feedback"
        tableData={data?.feedbacks}
        tableColumn={feedbacksDashboardColumn}
        tablePagination={true}
        searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
    </div>
  );
};
