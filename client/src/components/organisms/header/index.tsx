import React from "react";
import Navbar from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";

const Header = ({ user }: { user: any }) => {
  return (
    <>
      {user?.role === "admin" ? (
        <AdminNavbar user={user} />
      ) : (
        <Navbar user={user} />
      )}
    </>
  );
};

export default Header;
