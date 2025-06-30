"use client";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Modal from "../modal";
import { IconButton } from "@/components/atoms";
import { Pencil } from "lucide-react";

const EditModal = ({
  children,
  data,
  className,
  title
}: {
  children: (data: Record<string, any>, setIsOpen:Dispatch<SetStateAction<boolean>>) => ReactNode;
  data: Record<string, any>;
  className?:string;
  title?:string,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      title={title||"Edit Modal"}
      open={isOpen}
      setIsOpen={setIsOpen}
      className={className||"!max-w-[1200px] !w-full mx-5 !max-h-[90vh] h-full"}
      trigger={
        <IconButton bgColor="black" className="cursor-pointer text-white px-2">
          <Pencil size={20} />
        </IconButton>
      }
    >
      <div className="h-full !overflow-y-scroll">{children(data, setIsOpen)}</div>
    </Modal>
  );
};

export default EditModal;
