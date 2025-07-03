'use client'

import { useMutate } from "@/hooks/generalHooks";
import { usePRouter } from "@/hooks/useRouter";
import { imagesUrls } from "@/types";
import { Category } from "@/types/user";

export const SubCategoryCard = ({ category }: { category: Category }) => {
  const {MutateFunc} = useMutate()
  const router = usePRouter();
  const selectCategory = async (id:number|undefined) => {
    const res = await MutateFunc({url:'/auth/users/category',method:'POST', body:{categoryId:id}, tags:'', onSuccess:(result:any)=>{

    if (result?.user?.isVerified) {
      router.push("/welcome");
    } else {
      router.push("/verify");
    }
    }})
  };

  return (
    <div
      className="flex cursor-pointer items-center sm:justify-center justify-start gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg sm:flex-col hover:shadow-xl"
      onClick={() => selectCategory(category?.id)}
    >

      <div>
        <img
          src={`/uploads/categoryIcons/${imagesUrls[category?.name]??'principal'}.png`}
          width={200}
          height={300}
          alt={category?.name}
          className="w-[100px] h-[100px]"
        />
      </div>
      <div className="text-left sm:text-center">
        <div className="text-xl font-[600] text-black">{category?.name}</div>
        {/* <div className="font-[400]">{description}</div> */}
      </div>
    </div>
  );
};