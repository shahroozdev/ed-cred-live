"use client";
import React, { useState } from "react";
import { Button } from "../atoms";
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
        className="fixed bottom-0 left-0 flex h-[93vh] overflow-y-auto w-screen flex-col items-center justify-center gap-4 rounded-t-2xl bg-background text-[var(--mt-pre-color)] font-sans font-[400] shadow-inner z-[100] transition-all duration-300  p-6 sm:p-8"
        style={{ bottom: open.status ? "0" : "-100%" }}
      >
        {open.type==="signup"?<Signup/>:<Signin/>}
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
