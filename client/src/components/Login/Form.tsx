"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login } from "@/api/auth";
import { toast } from "sonner";
import Image from "next/image";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {

    const router = useRouter();
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [identifier, setIdentifier] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login(identifier, password);
            if (result?.success) {
                router.push("/dashboard");
            } else {
                setError(result.message);
            }

        } catch (error: any) {
            toast(error.message);
            setError(error.message);
        }
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your credentials to login
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="user@gmail.com" required onChange={(e) => setIdentifier(e.target.value)}/>
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline"> Forgot your password? </a>
                    </div>
                    <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                {
                    error && <div className="text-destructive-foreground">{error}</div>
                }
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full">
                    <Image src="/icons/google_icon.svg" width={24} height={24} alt="google_icon" />
                    Login with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4"> Sign up </a>
            </div>
        </form>
    )
}
