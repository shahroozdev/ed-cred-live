import ForgetPasswordForm from "@/components/pages/common/forgetPassword"
import ResetPasswordForm from "@/components/pages/common/resetPassword"
import Image from "next/image"

export default function ForgetPasswordPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 font-inter bg-background min-w-screen w-full max-w-screen overflow-hidden">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <Image src={"/logo.png"} width={30} height={100} alt="logo" />Ed Cred</a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <ResetPasswordForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/images/1.jpg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover _dark:brightness-[0.2] _dark:grayscale"
                />
            </div>
        </div>
    )
}
