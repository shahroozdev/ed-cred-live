"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/generalHooks";
import { usePRouter } from "@/hooks/useRouter";
import { resetPasswordSchema } from "@/lib/schemas";
import Image from "next/image";
import PLink from "@/components/atoms/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import PasswordInput from "@/components/atoms/passwordInput";

const ResetPasswordForm = () => {
  const { MutateFunc, isPending } = useMutate();
  const searchParams = useSearchParams()

  const router = usePRouter();

  const onSubmit = async (values: any) => {
    const res = await MutateFunc({
      url: "auth/reset-password",
      method: "POST",
      body: {password:values?.password, token:searchParams.get("token")},
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
      schema={resetPasswordSchema}
      defaultValues={{ password: "", confirmPassword:"" }}
    >
      <Image
        src={"/images/forget-password.png"}
        width={200}
        height={300}
        alt="ED-CRED"
      />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your new password
        </p>
      </div>
      <div className="grid gap-2">
        <FormFeilds
          fieldProps={{ name: "password", className: "grid gap-2" }}
          label={{ text: "Password" }}
        >
          {(field) => (
            <PasswordInput
              placeholder="Password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
                <FormFeilds
          fieldProps={{ name: "confirmPassword", className: "grid gap-2" }}
          label={{ text: "Confirm Password" }}
        >
          {(field) => (
            <PasswordInput
              placeholder="Confirm Password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <Button type="submit" className="w-full" loading={isPending}>
          Reset Password
        </Button>
      </div>
      <div className="flex flex-col text-center text-sm">
        <span>
          Don&apos;t have an account?{" "}
          <PLink
            href="/signup"
            className="text-primary cursor-pointer font-bold"
          >
            Sign up
          </PLink>
        </span>
        <span>
          Remember your Password?{" "}
          <PLink href="/login" className="text-primary cursor-pointer font-bold">
            Login
          </PLink>
        </span>
      </div>
    </FormTemplate>
  );
};

export default ResetPasswordForm;
