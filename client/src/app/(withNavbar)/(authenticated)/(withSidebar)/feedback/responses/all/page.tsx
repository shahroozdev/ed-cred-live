import TableWithFilter from "@/components/molecules/tableWithFilters";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { feedbacksDashboardColumn } from "@/data/tableColumns";
import { TitleWrapper } from "@/components/atoms";

const AllResponsePage = async({ searchParams }: { searchParams: any }) => {
    const params = await searchParams;
    const queryParams = new URLSearchParams(params);
    const data = await getServerSideDataWithFeatures({url:`/feedback-form?${queryParams.toString()}`, key:'feedbacksFormList'})

  return (
   <TitleWrapper title="Feedbacks Responses">
      <TableWithFilter
        noFilter
        title="All Feedbacks Responses"
        tableData={data?.feedbacks}
        tableColumn={feedbacksDashboardColumn}
        tablePagination={true}
        searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
      {/* <Title title="All Feedbacks Responses" desc="" />
      <FeedbackResponsesTable responses={responses} /> */}
    </TitleWrapper>
  );
};

export default AllResponsePage;
