"use client";
import React, { ReactNode, useState } from "react";
import Modal from "../modal";
import { Button, IconButton } from "@/components/atoms";
import { Pencil, Trash2 } from "lucide-react";

export interface ConfirmationModalProps {
  modalFor: "delete" | "edit";
  text: string;
  children: ReactNode;
  onConfirm?:()=>void
}

const ConfirmationModal = ({
  modalFor,
  text,
  children,
  onConfirm,
}: ConfirmationModalProps) => {
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
          <IconButton
            bgColor={`${modalFor === "delete" ? "#DC26264D" : "#DBEAFE"}`}
            circle
          >
            {modalFor === "delete" ? <Trash2 size={20}/> : <Pencil size={20}/>}

          </IconButton>
        </div>
      }
    >
      <div className="flex flex-col gap-7 justify-center items-center">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-lg font-medium">Are You Sure?</h1>
          <p className="text-sm text-[#6B7280]">{text}</p>
        </div>
        <div className="flex gap-3">
          <Button
            rounded={8}
            variant="primary"
            width="100"
            onClick={() => {onConfirm&&onConfirm();setIsOpen(false)}}
          >Yes</Button>
          <Button
            variant={"ghost"}
            background="#9CB2FF4D"
            rounded={8}
            color="#2563EB"
            width="100"
            onClick={() => setIsOpen(false)}
          >No</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
