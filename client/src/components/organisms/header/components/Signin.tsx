"use client";
import { useMutate } from "@/hooks/generalHooks";
import { Button } from "../../../atoms";
import PLink from "@/components/atoms/link";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePRouter } from "@/hooks/useRouter";
import Image from "next/image";

const Signin = ({setOpen}:{setOpen:React.Dispatch<React.SetStateAction<{ status: boolean; type: string }>>}) => {
  const { MutateFunc, isPending } = useMutate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = usePRouter();
  const onSubmit = async (values: LoginSchema) => {
    const res = await MutateFunc({
      url: "auth/login",
      method: "POST",
      body: values,
      onSuccess:(res:any)=> router.push(res?.user?.role==="admin"?'/admin-dashboard':'/dashboard'),
    });
  };

  return (
    <>
      <div className="text-2xl sm:text-3xl font-bold">Log In Below</div>

      <form
        className="flex w-full max-w-sm flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <input
            className="input w-full p-3 border border-gray-300 rounded-lg"
            {...register("identifier")}
            type="text"
            required
            placeholder="Enter Email or Username"
          />
          {errors.identifier && (
            <p className="text-sm text-red-500">
              {errors?.identifier?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            required
            className="input w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors?.password?.message}</p>
          )}
        </div>
        <PLink
          href="/forgot-password"
          className="mb-4 flex w-full justify-end text-sm text-gray-500"
        >
          Forgot password?
        </PLink>
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          loading={isPending}
        >
          <div className="text-lg">Sign in</div>
        </Button>
      </form>

      <div className="flex items-center gap-4 w-full max-w-sm">
        <div className="h-px flex-1 bg-gray-400"></div>
        <div className="text-[var(--mt-pre-color)]">OR</div>
        <div className="h-px flex-1 bg-gray-400"></div>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-2">
        <div className="w-full !flex !gap-2 !max-h-[40px] border items-center justify-center cursor-pointer rounded-md">
          <Image
            src="/icons/google_icon.svg"
            width={24}
            height={24}
            alt="google_icon"
            className="w-[30px] h-full"
          />
          <span>Sign with Google</span>
        </div>
        {/* <button className="w-full rounded-2xl bg-[#F3F9FA] py-3 text-sm sm:text-base text-black">
          Sign in with Facebook
        </button> */}
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer font-bold"
            onClick={() => setOpen({ status: true, type: "signup" })}
          >
            Sign Up
          </span>
        </div>
      </div>
    </>
  );
};

export default Signin;
