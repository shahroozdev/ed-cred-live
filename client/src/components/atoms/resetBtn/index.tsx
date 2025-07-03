"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import Button from "../button/Button";
import { useFormContext } from "react-hook-form";
import { usePRouter } from "@/hooks/useRouter";

const ResetBtn = ({
  setIsOpen,
}: {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = usePRouter();
  const { reset, getValues } = useFormContext();
  return (
    <Button
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
      Reset
    </Button>
  );
};

export default ResetBtn;
