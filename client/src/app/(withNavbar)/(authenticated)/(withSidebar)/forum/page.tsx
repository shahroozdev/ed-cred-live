import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import { AskQuestionCard } from "@/components/Forum/AskQuestionCard";
import { RecentQuestions } from "@/components/Forum/RecentQuestions";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { adminForumColumn } from "@/data/tableColumns";

const ForumPage = async() => {
    const data = await getServerSideDataWithFeatures({url:'/forum-question', key:'forumList'})
    console.log(data)
  return (
    <TitleWrapper title="All Forums">
      <AskQuestionCard />
      <TableWithFilter
        noFilter
        title="Forum List"
        tableData={data?.forums}
        tableColumn={adminForumColumn}
        tablePagination={true}
        // searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
    </TitleWrapper>
  );
};

export default ForumPage;
