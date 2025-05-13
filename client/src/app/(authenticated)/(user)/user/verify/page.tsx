"use client"

import { useState, useEffect } from "react";
import { getProfile } from "@/api/auth";
import { Category } from "@/store/categoryStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { postFormDataRequest, postRequest } from "@/api/config";
import { toast } from "sonner";
import Navbar from "@/components/Landing/Navbar";
import Footer from "@/components/Landing/Footer";
import { useUserProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/loader";

interface User {
    id:         string;
    username:   string
    email:      string
    category:   Category
    isVerified: boolean;
    verificationDocumentUrl: string | null;
}

const UserVerifyPage = () => {
    const { user } = useUserProfile();
    const [emailSent, setEmailSent] = useState(false);

    async function sendVerificationCode(email: string) {
        const res = await postRequest('auth/send-verification-email', JSON.stringify({ email: email }));
        toast.info(`Email sent to ${email}. Please check your inbox!`);
        if (res) setEmailSent(true);
    }

    const [verificationFile, setVerificationFile] = useState<File | null>(null);
    async function uploadVerificationDocument() {
        if (!verificationFile || !user) return;

        const formData = new FormData();
        formData.append('file', verificationFile);
        formData.append('userId', user.id);

        const res = await postFormDataRequest("auth/upload-verification", formData);
        if (res.error) {
            toast.error(res.message);
            return;
        }
        toast.info(res.message)
        // on sucessful document upload, we need to redirect the user to a homepage!
        // router.push("/");
    };

    if (!user) return (<div className="w-full h-screen items-center justify-center"><Loader /></div>)

    return (
        <main className="min-h-screen w-full text-foreground flex flex-col gap-20 pt-20 mt-40 items-center justify-between">
            <Navbar />
            {
                emailSent ? <div className="text-2xl flex flex-col gap-8 text-center">
                    Email has been sent.<br/> Check your email for verfication
                    <Button onClick={() => sendVerificationCode(user.email)}>Resend</Button>
                </div> :
                user ? user.isVerified ? <div className="flex items-center justify-center text-lg">You are already verified!</div> :
                    user.verificationDocumentUrl ? <div className="flex items-center justify-center text-lg">Your verification docuement has been uploaded!</div> :  
                        <>
                            <div className="max-w-xl mx-auto space-y-6">
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-bold capitalize">Welcome, {user.name}!</h1>
                                    <p className="text-muted-foreground">
                                        You selected the <strong>{user.category.name}</strong> category. This category requires verification. Please choose one of the following options:
                                    </p>
                                </div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Verify via Email</CardTitle>
                                        <CardDescription>Send a verification code to your email: <strong>{user.email}</strong></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button onClick={() => sendVerificationCode(user.email)}>Send Verification Code</Button>
                                    </CardContent>
                                </Card>

                                <div className="flex items-center gap-3 px-2">
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">OR</span>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Verify with Document</CardTitle>
                                        <CardDescription>
                                            Upload a valid government-issued ID or official document to verify your identity.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            {
                                                verificationFile ? 
                                                    // TODO: show the document if they have uploaded one
                                                    <img src={verificationFile.name} width="200" height="200" /> : 
                                                    <Input type="file" onChange={(e) => setVerificationFile(e.target.files?.[0] ?? null)} />
                                            }
                                            <Button variant="default" onClick={uploadVerificationDocument}>
                                                Upload Document
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </> : <></>
            }
            <Footer />
        </main>
    )
}

export default UserVerifyPage
