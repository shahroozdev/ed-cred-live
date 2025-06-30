"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useMutate } from "@/hooks/generalHooks";
import { Button } from "@/components/atoms";

const Verify = ({ user }: { user: Record<string, any> }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [verificationFile, setVerificationFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const { MutateFunc, isPending } = useMutate();

  async function sendVerificationCode() {
    const res = await MutateFunc({
      url: "/auth/send-verification-email",
      method: "POST",
      body: { email: user?.email },
    });
    if (res) setEmailSent(true);
  }

  async function uploadVerificationDocument() {
    if (!verificationFile || !user) return;
    const res = await MutateFunc({
      url: "/auth/upload-verification",
      method: "POST",
      body: { file: verificationFile, userId: user?.id },
      allowMulti: true,
    });
  }
  return (
    <>
      {emailSent ? (
        <div className="text-2xl flex flex-col gap-8 text-center">
          Email has been sent.
          <br /> Check your email for verfication
          <Button loading={isPending} onClick={() => sendVerificationCode()}>
            Resend
          </Button>
        </div>
      ) : user ? (
        user?.isVerified ? (
          <div className="flex items-center justify-center text-lg">
            You are already verified!
          </div>
        ) : user.verificationDocumentUrl ? (
          <div className="flex items-center justify-center text-lg">
            Your verification document has been uploaded!
          </div>
        ) : (
          <>
            <div className="max-w-xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verify via Email</CardTitle>
                  <CardDescription>
                    Send a verification code to your email:{" "}
                    <strong>{user.email}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    loading={isPending}
                    onClick={() => sendVerificationCode()}
                  >
                    Send Verification Code
                  </Button>
                </CardContent>
              </Card>

              <div className="flex items-center gap-3 px-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  OR
                </span>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Verify with Document</CardTitle>
                  <CardDescription>
                    Upload a valid government-issued ID or official document to
                    verify your identity.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {verificationFile ? (
                      // TODO: show the document if they have uploaded one
                      <img src={url} width="200" height="200" />
                    ) : (
                      <Input
                        type="file"
                        onChange={(e) => {
                          setVerificationFile(e.target.files?.[0] ?? null);
                          const file: any = e.target.files?.[0];
                          const blob = new Blob([file], { type: file.type });
                          const blobUrl = URL.createObjectURL(blob);
                          setUrl(blobUrl);
                        }}
                      />
                    )}
                    <Button
                      variant="primary"
                      loading={isPending}
                      onClick={uploadVerificationDocument}
                    >
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Verify;
