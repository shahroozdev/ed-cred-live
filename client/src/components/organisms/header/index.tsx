import React from "react";
import Navbar from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";

const Header = ({ user }: { user: any }) => {

  return (
    <>
      {user?.role === "admin" || user?.role === "super_admin" ? (
        <AdminNavbar user={user} />
      ) : (
        <Navbar user={user} />
      )}
    </>
  );
};

export default Header;
