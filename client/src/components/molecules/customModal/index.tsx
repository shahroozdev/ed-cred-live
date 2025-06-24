"use client";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import Modal from "../modal";

const CustomModal = ({
  children,
  title,
  trigger,
}: {
  children: (setIsOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  title?: string;
  trigger?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal
      title={title || ""}
      open={isOpen}
      setIsOpen={setIsOpen}
      trigger={trigger}
      className="max-h-[95vh] overflow-y-auto"
    >
      {children(setIsOpen)}
    </Modal>
  );
};

export default CustomModal;
