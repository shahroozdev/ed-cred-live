"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { CircleXIcon } from "lucide-react";
import { login } from "@/api/auth";

const Signin = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [identifier, setIdentifier] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login(identifier, password);
            if (result?.success) {
                router.push("/dashboard");
            } else {
                setError(result.message);
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setOpen(true)}>Sign-in</Button>
            <div
                className="fixed bottom-0 left-0 flex h-[93vh] w-screen flex-col items-center justify-center gap-4 rounded-t-2xl bg-white font-sans font-[400] shadow-inner transition-[bottom] px-4 sm:px-10 md:px-20"
                style={{ bottom: open ? "0" : "-100%" }}
            >
                <div className="text-2xl sm:text-3xl font-bold">Log in below</div>

                <form className="flex w-full max-w-sm flex-col gap-3" onSubmit={handleLogin}>
                    <div className="flex flex-col">
                        <input
                            className="input w-full p-3 border border-gray-300 rounded-lg"
                            onChange={(e) => setIdentifier(e.target.value)}
                            type="email"
                            required
                            placeholder="Enter Email or Username"
                        />
                    </div>
                    <div className="flex flex-col">
                        <input
                            type="password"
                            required
                            className="input w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex w-full justify-end text-sm text-gray-500">
                        Forgot password?
                    </div>
                    <div className="text-red-600">{error}</div>
                    <Button variant="primary" type="submit" className="w-full">
                        <div className="text-lg">Sign in</div>
                    </Button>
                </form>

                <div className="flex items-center gap-4 w-full max-w-sm">
                    <div className="h-px flex-1 bg-gray-400"></div>
                    <div className="text-black">OR</div>
                    <div className="h-px flex-1 bg-gray-400"></div>
                </div>

                <div className="flex w-full max-w-sm flex-col gap-2">
                    <button className="w-full rounded-2xl bg-[#F3F9FA] py-3 text-sm sm:text-base">
                        Sign in with Google
                    </button>
                    <button className="w-full rounded-2xl bg-[#F3F9FA] py-3 text-sm sm:text-base">
                        Sign in with Facebook
                    </button>
                    <div className="text-center text-sm">
                        Don't have an account? <span className="text-primary cursor-pointer">Sign Up</span>
                    </div>
                </div>

                <CircleXIcon
                    onClick={() => setOpen(false)}
                    size={40}
                    strokeWidth={1}
                    stroke="#00000099"
                    className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
                />
            </div>
        </>
    );
};

export default Signin;
