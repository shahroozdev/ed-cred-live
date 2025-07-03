"use client";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../button/Button";
import { Flag } from "lucide-react";
import { useMutate } from "@/hooks/generalHooks";
import PLink from "@/components/atoms/link";

const DisputeBtn = ({ id, disabled }: { id: number; disabled: boolean }) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (
    data: Record<string, any>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    await MutateFunc({
      url: `/disputes/${id}`,
      method: "POST",
      body: data,
      allowMulti: true,
      onSuccess: () => setIsOpen(false),
    });
  };
  return (
    <>
      {disabled ? (
        <Button
          variant="ghost"
          icon={<Flag stroke="black" fill="black" />}
          disabled
        >
          {" "}
          {"  Disputed"}
        </Button>
      ) : (
        <PLink href={`/disputes/create/${id}`}>
          <Button variant="ghost" icon={<Flag />}>
            {" "}
            {"  Dispute this Review"}
          </Button>
        </PLink>
      )}
    </>
  );
};

export default DisputeBtn;
