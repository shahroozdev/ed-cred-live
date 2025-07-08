"use client";
import Modal from "@/components/molecules/modal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const ChooseCategoryIcon = ({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const icons = ["districts", "leadership", "principal", "schools", "staff","adult", "parents","student","Teachers"];

  return (
    <Modal
      title="Choose Icon"
      trigger={
        <div className="flex flex-col items-center justify-center gap-1 border rounded-xl border-dashed p-5 cursor-pointer">
          {" "}
          <Image
            width={60}
            height={50}
            alt=""
            src={`/uploads/categoryIcons/${value}.png`}
            onError={(event: any) => {
              event.target.srcset = "/icons/upload-icon.svg";
            }}
          />
        </div>
      }
      open={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="grid grid-cols-3 gap-2 cursor-pointer">
        {icons?.map((icon, index) => (
          <div
            key={index}
            onClick={() => onChange(icon)}
            className={cn(
              "w-full p-1 rounded-2xl",
              value === icon ? "bg-red-100" : "bg-background"
            )}
          >
            <Image
              alt={icon + "| ED-Cred"}
              src={`/uploads/categoryIcons/${icon}.png`}
              width={100}
              height={100}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <p
          className="bg-primary px-2 py-1 rounded text-white cursor-pointer "
          onClick={() => setIsOpen(false)}
        >
          Select
        </p>
      </div>
    </Modal>
  );
};

export default ChooseCategoryIcon;
