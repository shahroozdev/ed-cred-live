"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/generalHooks";
import { ForgetPasswordSchema, forgetPasswordSchema } from "@/lib/schemas";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ForgetPasswordForm = () => {
  const { MutateFunc, isPending } = useMutate();

  const router = useRouter();

  const onSubmit = async (values: ForgetPasswordSchema) => {
    const res = await MutateFunc({
      url: "auth/login",
      method: "POST",
      body: values,
      onSuccess: (res: any) =>
        router.push(
          res?.user?.role === "admin" ? "/admin-dashboard" : "/dashboard"
        ),
    });
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      className={"flex flex-col items-center gap-6"}
      schema={forgetPasswordSchema}
      defaultValues={{ email: "" }}
    >
      <Image
        src={"/images/forget-password.png"}
        width={200}
        height={300}
        alt="ED-CRED"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forget Password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Email to get rest Link
        </p>
      </div>
      <div className="grid gap-2">
        <FormFeilds
          fieldProps={{ name: "email", className: "grid gap-2" }}
          label={{ text: "Email" }}
        >
          {(field) => (
            <Input
              placeholder="user@gmail.com"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <Button type="submit" className="w-full" loading={isPending}>
          Send Mail
        </Button>
      </div>
      <div className="flex flex-col text-center text-sm">
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary cursor-pointer font-bold"
          >
            Sign up
          </Link>
        </span>
        <span>
          Remember your Password?{" "}
          <Link href="/login" className="text-primary cursor-pointer font-bold">
            Login
          </Link>
        </span>
      </div>
    </FormTemplate>
  );
};

export default ForgetPasswordForm;
