"use client";
import { FormEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth";
import Footer from "@/components/Landing/Footer";
import Navbar from "@/components/Landing/Navbar";
import { Button } from "@/components/atoms";
import { CircleXIcon } from "lucide-react";
import Link from "next/link";

const SingupPage = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState<any>(null);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    // const handleSumbit: FormEventHandler<HTMLFormElement> = async(e) => {
    //     e.preventDefault();

    //     if (password !== confirmPassword) {
    //         setError("Passwords don't match");
    //         return;
    //     }
    //     if (password.length < 8) {
    //         setError("Password must be atleast 8 characters");
    //         return;
    //     }
    //     const response = await signup(username, email, password);
    //     if (response.error) {
    //         setError(response.message);
    //         return;
    //     }

    //     router.push("/signup/category/");
    // }
    const handleSignup = async (e:any) => {
        e.preventDefault();

        setError("");
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        } 

        try {
            const response = await signup(username, email, password);
            if (response.error) {
                setError(response.message);
                return;
            }

            router.push("/signup/category/");

        } catch (error) {
            console.error(error);
            setError(error);
        }
    };
    return(
        // <main className="w-full h-screen font-inter flex flex-col items-center justify-between gap-40 mt-40">
        //     <div className="w-lg text-center">
        //         <div className="font-semibold text-3xl">Sign Up</div>
        //         <p className="mt-4">Already have an account? <a className="underline underline-offset-4 text-base">login</a></p>

        //         <form className="mt-8" onSubmit={handleSumbit}>

        //             <Label className="mb-2">Username</Label>
        //             <Input 
        //                 required 
        //                 type="text"
        //                 placeholder="username"
        //                 className="mb-6" 
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />

        //             <Label className="mb-2">Email</Label>
        //             <Input 
        //                 required 
        //                 type="text"
        //                 placeholder="email"
        //                 className="mb-6" 
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />

        //             <Label className="mb-2">Password</Label>
        //             <Input 
        //                 required 
        //                 type="password" 
        //                 placeholder="password"
        //                 className="mb-6" 
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />

        //             <Label className="mb-2">Confirm Password</Label>
        //             <Input 
        //                 required 
        //                 type="password" 
        //                 placeholder="confirm password"
        //                 className="mb-6" 
        //                 onChange={(e) => setConfirmPassword(e.target.value)}
        //             />

        //             {/*<div className="mb-6 w-full flex p-4 border-2 border-muted rounded-md items-center justify-center">
        //                 Do you want to receive promotional emails?
        //                 <Checkbox className="ml-auto" />
        //             </div>*/}

        //             {
        //                 error && <div className="text-destructive-foreground text-left mb-4">{error}</div>
        //             }

        //             <Button className="w-full" variant="default" type="submit">
        //                 Signup
        //             </Button>
        //             <p className="mt-4 text-sm text-muted-foreground">By clicking continue, you agree to our <br/> <a className="underline underline-offset-4" href="terms-and-conditions">Terms of Service</a> and <a className="underline underline-offset-4" href="/privacy-policy">Privacy Policy</a>.</p>
        //         </form>
        //     </div>
        // </main>
                <>
                    <div className='flex h-[93vh] w-screen flex-col items-center justify-center gap-4 rounded-t-2xl bg-background font-sans font-[400] shadow-inner transition-[bottom] p-6 sm:p-8'
                    >
                        <div className='text-2xl sm:text-3xl font-bold'>Sign Up below</div>
                        <form className='flex w-full max-w-md flex-col gap-4' onSubmit={handleSignup}>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input
                                    className='w-full p-3 border rounded-md'
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='haseeb@high-house.com'
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Username</label>
                                <input
                                    className='w-full p-3 border rounded-md'
                                    type='text'
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder='Haseeb Khalid'
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Password</label>
                                <input
                                    type='password'
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full p-3 border rounded-md'
                                    placeholder='password (minimum 8 characters)'
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Confirm Password</label>
                                <input
                                    type='password'
                                    required
                                    className='w-full p-3 border rounded-md'
                                    placeholder='confirm password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 flex items-center gap-2 text-sm">
                                <input type="checkbox" id="newsletter" className="h-5 w-5 cursor-pointer accent-primary" />
                                <label htmlFor="newsletter" className="cursor-pointer opacity-70">
                                    I'd like to receive newsletters & paid plans.
                                </label>
                            </div>
                            <div className="text-red-600">{error}</div>
                            <Button variant='primary' type="submit" className="w-full">
                                <div className='text-lg'>Join Now</div>
                            </Button>
                        </form>
                        <div className="flex items-center gap-4 w-full max-w-md">
                            <div className="h-px flex-1 bg-gray-400"></div>
                            <div>OR</div>
                            <div className="h-px flex-1 bg-gray-400"></div>
                        </div>
                        <div className='flex w-full max-w-md flex-col gap-3 '>
                            <button className='w-full rounded-2xl bg-[#F3F9FA] px-6 py-3 text-black'>
                                Sign up with Google
                            </button>
                            <button className='w-full rounded-2xl bg-[#F3F9FA] px-6 py-3 text-black'>
                                Sign up with Facebook
                            </button>
                            <div className="text-center">Already have an account? <Link href={"/login"} className='text-primary cursor-pointer font-bold'>Sign in</Link></div>
                        </div>
                    </div>
                </>
    )
}

export default SingupPage;
