"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth";
import Image from "next/image";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";

const SingupPage = () => {

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSumbit: FormEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (password.length < 8) {
            setError("Password must be atleast 8 characters");
            return;
        }
        const response = await signup(username, email, password);
        if (response.error) {
            setError(response.message);
            return;
        }

        router.push("/signup/category/");
    }

    return(
        <main className="w-full h-screen font-inter flex flex-col items-center justify-between gap-40 mt-40">
            <Navbar />
            <div className="w-lg text-center">
                <div className="font-semibold text-3xl">Sign Up</div>
                <p className="mt-4">Already have an account? <a className="underline underline-offset-4 text-base">login</a></p>

                <form className="mt-8" onSubmit={handleSumbit}>

                    <Label className="mb-2">Username</Label>
                    <Input 
                        required 
                        type="text"
                        placeholder="username"
                        className="mb-6" 
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Label className="mb-2">Email</Label>
                    <Input 
                        required 
                        type="text"
                        placeholder="email"
                        className="mb-6" 
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Label className="mb-2">Password</Label>
                    <Input 
                        required 
                        type="password" 
                        placeholder="password"
                        className="mb-6" 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Label className="mb-2">Confirm Password</Label>
                    <Input 
                        required 
                        type="password" 
                        placeholder="confirm password"
                        className="mb-6" 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {/*<div className="mb-6 w-full flex p-4 border-2 border-muted rounded-md items-center justify-center">
                        Do you want to receive promotional emails?
                        <Checkbox className="ml-auto" />
                    </div>*/}

                    {
                        error && <div className="text-destructive-foreground text-left mb-4">{error}</div>
                    }

                    <Button className="w-full" variant="default" type="submit">
                        Signup
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">By clicking continue, you agree to our <br/> <a className="underline underline-offset-4" href="terms-and-conditions">Terms of Service</a> and <a className="underline underline-offset-4" href="/privacy-policy">Privacy Policy</a>.</p>
                </form>
            </div>
            <Footer />
        </main>
    )
}

export default SingupPage;
