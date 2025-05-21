import React from "react";
import VerifyUserCard from "./components/verifyUserCard";
import UpdateThroughSelect from "./components/updateThroughSelect";
import TableWithFilter from "@/components/molecules/tableWithFilters";
import { usersAdminColumn } from "@/data/tableColumns";

const UsersPageComponent = ({users}:{users:any}) => {

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
