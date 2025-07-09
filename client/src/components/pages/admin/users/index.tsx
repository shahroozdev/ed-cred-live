import React from "react";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { usersAdminColumn } from "@/data/tableColumns";

const UsersPageComponent = ({users}:{users:any}) => {
  console.log(users, 'users')
  return (
    <div>
      <TableWithFilter
        noFilter
        title="Users List"
        tableData={users?.users}
        tableColumn={usersAdminColumn}
        tablePagination={true}
        searchBar
        total={users?.total}
        currentPage={users?.currentPage}
        pageSize={users?.pageSize}
      />
    </div>
  );
};

export default UsersPageComponent;
