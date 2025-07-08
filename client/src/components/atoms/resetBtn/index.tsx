"use client";
import React, { Dispatch, ReactNode, SetStateAction, useTransition } from "react";
import Button from "../button/Button";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";

const ResetBtn = ({
  setIsOpen,
  icon,
  text
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  icon?:ReactNode
  text?:string
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { reset } = useFormContext();
  return (
    <Button
      icon={icon}
      variant="ghost"
      type="reset"
      loading={isPending}
      onClick={() => {
        startTransition(() => {
          router.replace("?");
          reset(); 
          setTimeout(()=>{router.refresh()},500)
        });
        setIsOpen && setIsOpen(false);
      }}
    >
      {text||"Reset"}
    </Button>
  );
};

export default ResetBtn;
