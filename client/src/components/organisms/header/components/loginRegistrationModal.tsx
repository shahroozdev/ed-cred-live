"use client";
import React, { useState } from "react";
import { Button } from "../../../atoms";
import { CircleXIcon } from "lucide-react";
import Signup from "./Signup";
import Signin from "./Signin";

const LoginRegistrationModal = () => {
  const [open, setOpen] = useState({ status: false, type: "" });
  return (
    <>
      <Button
        variant="border"
        onClick={() => setOpen({ status: true, type: "signup" })}
        className="border border-[#439E5E] text-[#439E5E]"
      >
        Join Now
      </Button>
      <Button
        variant="primary"
        onClick={() => setOpen({ status: true, type: "login" })}
      >
        Sign-in
      </Button>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
  style={{ visibility: open.status ? "visible" : "hidden" }}
      >
        <div className="w-full max-w-md max-h-[90vh] no-scrollbar overflow-y-auto p-6 rounded-2xl bg-background">
        {open.type==="signup"?<Signup/>:<Signin/>}
        </div>
        <CircleXIcon
          onClick={() => setOpen({ status: false, type: "" })}
          size={40}
          strokeWidth={1}
        //   stroke="#00000099"
          className="absolute top-6 left-2/3 -translate-x-1/2 cursor-pointer text-[var(--mt-pre-color)]"
        />
      </div>
    </>
  );
};

export default LoginRegistrationModal;
