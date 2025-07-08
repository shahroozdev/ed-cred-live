import { getServerSideDataWithFeatures } from '@/actions/serverActions';
import { TitleWrapper } from '@/components/atoms'
import TableWithFilter from '@/components/molecules/tableWithFilters'
import { userDisputeColumn } from '@/data/tableColumns';
import React from 'react'

const ManageDisputes = async() => {
    const data = await getServerSideDataWithFeatures({
        url: "/disputes/byUser",
        key: "disputesByUser",
      });
  return (
 <TitleWrapper title={"Manage Disputes"} notBackBtn>
    <TableWithFilter
      noFilter
      title="Manage Your Disputes"
      tableData={data?.disputes}
      tableColumn={userDisputeColumn}
      tablePagination={true}
      // searchBar
      total={data?.total}
      currentPage={data?.currentPage}
      pageSize={data?.pageSize}
    />
  </TitleWrapper>
  )
}

export default ManageDisputes