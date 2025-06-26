import { Stats } from "@/components/Common/Stats";
import { PromoCard, TitleWrapper } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { postsAdminColumn } from "@/data/tableColumns";

const PostListingPage = async () => {
  const posts = await getServerSideDataWithFeatures({
    url: `/posts`,
    key: "posts",
  });
  const stats = [
    {
      title: "Total Posts",
      value: posts?.total,
    },
    {
      title: "Active Posts",
      value: posts?.activeTotal,
    },
    {
      title: "Featured Posts",
      value: posts?.featuredTotal,
    },
  ];

  return (
    <TitleWrapper title="Recent posts" desc="">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PromoCard
          title="Create a post"
          desc="posts are great way to communitcate with other people about our ideas"
          cta="create"
          url="/posts/create"
        />
        <Stats stats={stats} />
        <TableWithFilter
        //   form={FeedbackFilterForm}
          noFilter
          title="Recent Posts"
          tableData={posts?.posts}
          tableColumn={postsAdminColumn}
          tablePagination={true}
          searchBar
          total={posts?.total}
          currentPage={posts?.currentPage}
          pageSize={posts?.pageSize}
        />
      </div>
    </TitleWrapper>
  );
};

export default PostListingPage;
