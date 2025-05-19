"use client";
import React, { ReactNode, useState } from "react";
import Modal from "../modal";
import { Button, IconButton } from "@/components/atoms";
import { useMutate } from "@/hooks/generalHooks";
import { Trash2 } from "lucide-react";

export interface ConfirmationModalProps {
  text: string;
  children: ReactNode;
  url:string;
  qkey?:string;
}

const ConfirmationDeleteModal = ({
  text,
  children,
  url,
  qkey
}: ConfirmationModalProps) => {
  const [open, setIsOpen] = useState(false);
    const {MutateFunc} = useMutate();
    const onDelete=async()=>{
      await MutateFunc({url, method:'DELETE', tags:qkey})
      setIsOpen(false)
    }
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
            bgColor={`red`}
            circle
            className="text-white"
          >
             <Trash2 />
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
            onClick={onDelete}
          >Yes</Button>
          <Button
            variant={"outline"}
            background="#9CB2FF4D"
            rounded={8}
            color="#2563EB"
            text={`No`}
            width="100"
            onClick={() => setIsOpen(false)}
          >No</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDeleteModal;
