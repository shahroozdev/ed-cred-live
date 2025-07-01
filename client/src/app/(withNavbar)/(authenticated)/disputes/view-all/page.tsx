import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import { Stats } from "@/components/Common/Stats";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { adminDisputeColumn } from "@/data/tableColumns";

const FeedbackDisputePage = async () => {
  const data = await getServerSideDataWithFeatures({
    url: "/disputes",
    key: "disputes",
  });
  const disputesStats = await getServerSideDataWithFeatures({
    url: "/disputes/stats",
    key: "disputesStats",
  });

  const stats = [
    {
      title: "Total Disputes",
      value: data?.total,
    },
    {
      title: "Pending Disputes",
      value: disputesStats?.disputesStats?.totalPending,
    },
    {
      title: "Resolved Disputes",
      value: disputesStats?.disputesStats?.totalResolved,
    },
    {
      title: "Rejected Disputes",
      value: disputesStats?.disputesStats?.totalRejected,
    },
  ];
  return (
    <TitleWrapper title={"Disputes"}>
      <Stats stats={stats} />
      <TableWithFilter
        noFilter
        title="All Disputes"
        tableData={data?.disputes}
        tableColumn={adminDisputeColumn}
        tablePagination={true}
        // searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
    </TitleWrapper>
  );
};
export default FeedbackDisputePage;
