import TableWithFilter from "@/components/molecules/tableWithFilters";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { feedbacksResponsesColumn } from "@/data/tableColumns";
import { TitleWrapper } from "@/components/atoms";

const AllResponsePage = async({ searchParams }: { searchParams: any }) => {
    const params = await searchParams;
    const queryParams = new URLSearchParams(params);
    const data = await getServerSideDataWithFeatures({url:`/feedback-responses?${queryParams.toString()}`, key:'feedbacksFormList'})
      console.log(data)
  return (
   <TitleWrapper title="Feedbacks Responses">
      <TableWithFilter
        noFilter
        title="All Feedbacks Responses"
        tableData={data?.responses}
        tableColumn={feedbacksResponsesColumn}
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
