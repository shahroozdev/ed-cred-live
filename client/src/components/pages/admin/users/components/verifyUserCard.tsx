"use client";
import { Button } from "@/components/atoms";
import Modal from "@/components/molecules/modal";
import { useMutate } from "@/hooks/generalHooks";
import Image from "next/image";

import React, { ReactNode, useState } from "react";

const VerifyUserCard = ({
  user,
  children,
}: {
  user: any;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const {MutateFunc, isPending} = useMutate()
  const verifyUser = async (userId: number, action: "approve" | "reject") => {
    const res = await MutateFunc({url:"/auth/verify-user", method:'POST', body:{ userId: userId, action: action }, onSuccess:()=>setOpen(false)})
    };

  return (
    <Modal
      trigger={children}
      className="w-max min-w-88"
      open={open}
      setIsOpen={setOpen}
      title={"Verify User Documents"}
    >
      <div className="relative z-10">
        {user?.verificationDocumentUrl && !user.isVerified ? (
          <div className="flex flex-col gap-4 items-center">
                <Image
                  src={process.env.BASE_URL+user.verificationDocumentUrl}
                  width={200}
                  height={200}
                  alt="verification-document"
                  className="cursor-pointer hover:opacity-80 transition"
                />
            <div className="flex items-center gap-4 w-full">
              <Button
                loading={isPending}
                onClick={() => verifyUser(user.id, "reject")}
                className="flex-grow bg-red-500 text-white border-solid hover:text-red-500 hover:border-red-500"
              >
                Cancel
              </Button>
              <Button
               loading={isPending}
                onClick={() => verifyUser(user.id, "approve")}
                className="flex-grow bg-green-500 text-white"
              >
                Verify
              </Button>
            </div>
          </div>
        ) : (
          <>No Document Uploaded Yet By User.</>
        )}
      </div>
    </Modal>
  );
};

export default VerifyUserCard;
