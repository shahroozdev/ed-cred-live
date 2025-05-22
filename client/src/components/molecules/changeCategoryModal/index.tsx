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
      notClose
      className="w-xs"
      open={open}
      setIsOpen={setIsOpen}
      title={
        <div className="flex flex-col gap-4 justify-center items-center">
          <IconButton bgColor={`purpal`} circle className="text-white">
            <Repeat1 />
          </IconButton>
        </div>
      }
    >
      <UpdateThroughSelect user={data} type={"category"} />
    </Modal>
  );
};

export default ChangeCategoryModal;
