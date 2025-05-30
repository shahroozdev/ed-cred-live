"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { loginSchema, LoginSchema } from "@/lib/schemas";
import { useMutate } from "@/hooks/generalHooks";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { MutateFunc, isPending } = useMutate();

  const router = useRouter();

  const onSubmit = async (values: LoginSchema) => {
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
      className={cn("flex flex-col gap-6", className)}
      schema={loginSchema}
      defaultValues={{ identifier: "", password: "" }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your credentials to login
        </p>
      </div>
      <div className="grid gap-2">
        <FormFeilds
          fieldProps={{ name: "identifier", className: "grid gap-2" }}
          label={{ text: "Email/Username" }}
        >
          {(field) => (
            <Input
              placeholder="user@gmail.com"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "password", className: "grid gap-2" }}
          label={{ text: "Password" }}
        >
          {(field) => (
            <Input
              type="password"
              placeholder="Password"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <Link
          href="/forgot-password"
          className="ml-auto text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </Link>

        <Button type="submit" className="w-full" loading={isPending}>
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
        <Link href="/signup" className="text-primary cursor-pointer font-bold">
          Sign up
        </Link>
      </div>
    </FormTemplate>
  );
}
