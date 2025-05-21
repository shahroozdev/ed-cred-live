"use client";
import { postRequest } from "@/api/config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const VerifyUserCard = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);
  const verifyUser = async (userId: number, action: "approve" | "reject") => {
    const res = await postRequest(
      "auth/verify-user",
      JSON.stringify({ userId: userId, action: action })
    );
  };
  return (
    <>
      {user?.verificationDocumentUrl && !user.isVerified && (
        <>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4 items-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <img
                  src={user.verificationDocumentUrl}
                  width={200}
                  height={"auto"}
                  alt="verification-document"
                  className="cursor-pointer hover:opacity-80 transition"
                  onClick={() => setOpen(true)}
                />
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogTitle>User Verification Document</DialogTitle>
                <img
                  src={user.verificationDocumentUrl}
                  alt="verification-document-full"
                  className="w-full h-auto rounded"
                />

                <div className="flex items-center gap-4 w-full">
                  <Button
                    onClick={() => verifyUser(user.id, "reject")}
                    className="flex-grow"
                    variant="destructive"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => verifyUser(user.id, "approve")}
                    className="flex-grow"
                  >
                    Verify
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center gap-4 w-full">
              <Button
                onClick={() => verifyUser(user.id, "reject")}
                className="flex-grow"
                variant="destructive"
              >
                Cancel
              </Button>
              <Button
                onClick={() => verifyUser(user.id, "approve")}
                className="flex-grow"
              >
                Verify
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VerifyUserCard;
