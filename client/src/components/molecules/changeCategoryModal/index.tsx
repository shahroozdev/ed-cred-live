"use client";
import { IconButton } from "@/components/atoms";
import { Repeat1 } from "lucide-react";
import React, { ReactNode, useState } from "react";
import Modal from "../modal";
import UpdateThroughSelect from "@/components/pages/admin/users/components/updateThroughSelect";

const ChangeCategoryModal = ({
  children,
  data,
  qkey,
}: {
  children: ReactNode;
  data: Record<string, any>;
  qkey?: string;
}) => {
  const [open, setIsOpen] = useState(false);
  return (
    <Modal
      trigger={children}
      className="w-max"
      open={open}
      setIsOpen={setIsOpen}
      title={"Update User Category"}
    >
      <div className="relative z-10">
        {" "}
        {/* Add this wrapper */}
        <UpdateThroughSelect user={data} type="category" />
      </div>
    </Modal>
  );
};

export default ChangeCategoryModal;
