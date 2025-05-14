"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/api/auth";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "../atoms";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutate } from "@/hooks/generalHooks";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
    const {MutateFunc} = useMutate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSuccess= async(values:any)=>{
    if(values?.user?.role==="admin"){
        router.push('/dashboard')
    }else{
        router.push('/user/dashboard')
    }
  }
  const onSubmit = async (values: LoginSchema) => {
      const res = await MutateFunc({url:'auth/login', method:'POST', body:values, onSuccess})
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credentials to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="user@gmail.com"
            required
            {...register("identifier")}
          />
          {errors.identifier && (
            <p className="text-sm text-red-500">{errors?.identifier?.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            required
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="w-full !flex !gap-2 !max-h-[40px] border items-center justify-center cursor-pointer rounded-md">
          <Image
            src="/icons/google_icon.svg"
            width={24}
            height={24}
            alt="google_icon"
            className="w-[30px] h-full"
          />
          <span>Login with Google</span>
        </div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline underline-offset-4">
          {" "}
          Sign up{" "}
        </a>
      </div>
    </form>
  );
}
