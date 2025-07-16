"use client";
import { usePRouter } from "@/hooks/useRouter";
import React from "react";

const GoBackBtn = () => {
  const router = usePRouter();
  return (
    <button
      className="hover:bg-white bg-primary text-md hover:text-primary text-white font-normal border-2 border-primary p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => router.back()}
    >
      Go Back
    </button>
  );
};

export default GoBackBtn;
