"use client";
import React, { ReactNode, useState } from "react";
import Modal from "../modal";

const CustomModal = ({
  children,
  title,
  trigger,
}: {
  children: ReactNode;
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
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
