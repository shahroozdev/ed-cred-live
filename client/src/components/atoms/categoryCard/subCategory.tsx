"use client";

import { useMutate } from "@/hooks/generalHooks";
import { usePRouter } from "@/hooks/useRouter";
import { Category } from "@/types/user";
import Image from "next/image";

export const SubCategoryCard = ({ category }: { category: Category }) => {
  const { MutateFunc } = useMutate();
  const router = usePRouter();
  const selectCategory = async (id: number | undefined) => {
    const res = await MutateFunc({
      url: "/auth/users/category",
      method: "POST",
      body: { categoryId: id },
      tags: "",
      onSuccess: (result: any) => {
        if (result?.user?.isVerified) {
          router.push("/welcome");
        } else {
          router.push("/verify");
        }
      },
    });
  };

  return (
    <div
      className="flex cursor-pointer items-center sm:justify-center justify-start gap-4 rounded-3xl border border-muted border-solid bg-white p-8 text-center shadow-lg sm:flex-col hover:shadow-xl"
      onClick={() => selectCategory(category?.id)}
    >
      <div>
        <Image
          src={`/uploads/categoryIcons/${category?.iconUrl}.png`}
          width={100}
          height={100}
          alt={category?.name}
          className="w-[100px] h-[100px] object-cover"
          onError={(e: any) => {
            e.target.src = "/uploads/categoryIcons/principal";
          }}
        />
      </div>
      <div className="text-left sm:text-center">
        <div className="text-xl font-[600] text-black">{category?.name}</div>
        {/* <div className="font-[400]">{description}</div> */}
      </div>
    </div>
  );
};
