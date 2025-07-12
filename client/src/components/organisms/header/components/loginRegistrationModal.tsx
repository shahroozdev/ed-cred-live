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
        className="border border-[#439E5E] border-solid text-[#439E5E]"
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background h-[calc(100%-70px)] bottom-0 top-[70px]"
  style={{ visibility: open.status ? "visible" : "hidden" }}
      >
        <div className="w-full max-w-md max-h-[90vh] no-scrollbar overflow-y-auto p-6 rounded-2xl bg-background relative">
        {open.type==="signup"?<Signup setOpen={setOpen}/>:<Signin setOpen={setOpen}/>}
        </div>
        <CircleXIcon
          onClick={() => setOpen({ status: false, type: "" })}
          size={40}
          strokeWidth={1}
          //   stroke="#00000099"
          className="absolute top-6 sm:translate-x-[calc(50%+200px)] -translate-x-[calc(calc(50%-180px))] bg-background rounded-full cursor-pointer text-[var(--mt-pre-color)]"
          />
      </div>
    </>
  );
};

export default LoginRegistrationModal;
