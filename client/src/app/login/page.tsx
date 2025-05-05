import { LoginForm } from "@/components/Login/Form"
import Image from "next/image"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 font-inter">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <Image src={"/logo.png"} width={30} height={100} alt="logo" />Ed Cred</a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/image1.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover _dark:brightness-[0.2] _dark:grayscale"
                />
            </div>
        </div>
    )
}
