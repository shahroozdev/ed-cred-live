import { getServerSideDataWithFeatures } from '@/actions/serverActions';
import { TitleWrapper } from '@/components/atoms'
import TableWithFilter from '@/components/molecules/tableWithFilters'
import { adminDisputeColumn, adminDocumentsColumn } from '@/data/tableColumns';
import React from 'react'

const AllDocuments = async() => {
      const data = await getServerSideDataWithFeatures({
    url: "/documents",
    key: "documents",
  });
  console.log(data)
  return (
       <TitleWrapper title={"ALL Document"} desc="Here you can edit all required documents">
      <TableWithFilter
        noFilter
        title="All Documents"
        tableData={data}
        tableColumn={adminDocumentsColumn}
        tablePagination={true}
        // searchBar
        total={data?.total}
        currentPage={data?.currentPage}
        pageSize={data?.pageSize}
      />
    </TitleWrapper>
  )
}

export default AllDocuments