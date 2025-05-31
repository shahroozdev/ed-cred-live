"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms";
import Link from "next/link";
import { useMutate } from "@/hooks/generalHooks";
import { signupSchema, SignupFormData } from "@/lib/schemas";

const SignupPage = () => {

  const { MutateFunc, isPending } = useMutate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const res = await MutateFunc({
      url: "auth/signup",
      method: "POST",
      body: data,
      sendTo: "/signup/category/",
    });
  };

  return (
    <>
      <div className="text-2xl sm:text-3xl font-bold">Sign Up below</div>
      <form
        className="flex w-full max-w-md flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="w-full p-3 border rounded-md"
            placeholder="abc@xyz.com"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            {...register("username")}
            className="w-full p-3 border rounded-md"
            placeholder="John etc."
          />
          {errors.username && (
            <p className="text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 border rounded-md"
            placeholder="password (minimum 8 characters)"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-3 border rounded-md"
            placeholder="confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="newsletter"
            className="h-5 w-5 cursor-pointer accent-primary"
          />
          <label htmlFor="newsletter" className="cursor-pointer opacity-70">
            I'd like to receive newsletters & paid plans.
          </label>
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full"
          loading={isPending}
        >
          <div className="text-lg">Join Now</div>
        </Button>
      </form>

      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="h-px flex-1 bg-gray-400"></div>
        <div>OR</div>
        <div className="h-px flex-1 bg-gray-400"></div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <button className="w-full rounded-2xl bg-[#F3F9FA] px-6 py-3 text-black">
          Sign up with Google
        </button>
        <button className="w-full rounded-2xl bg-[#F3F9FA] px-6 py-3 text-black">
          Sign up with Facebook
        </button>
        <div className="text-center">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primary cursor-pointer font-bold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
