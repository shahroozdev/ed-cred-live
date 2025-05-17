import React from "react";
import Navbar from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";

const Header = ({ user }: { user: any }) => {
  return (
    <>
      {user.role !== "admin" ? (
        <Navbar user={user} />
      ) : (
        <AdminNavbar user={user} />
      )}
    </>
  );
};

export default Header;
