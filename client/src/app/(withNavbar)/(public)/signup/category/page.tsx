"use client";
import { setUserCategory } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@/types/user";
import { imagesUrls } from "@/types";
import TitleWrapper from "@/components/atoms/titleWrapper";
import { useMutate, useQuery } from "@/hooks/generalHooks";
import { Loader2 } from "lucide-react";

const SignupCategorySelectPage = () => {
  const { data, isLoading, error } = useQuery({
    url: "/subcategory",
    key: "subcategories",
  });
  const categories = data?.subcategories;
console.log(categories)
  return (
    <TitleWrapper title={"Select Category"} desc="Please select a category you are a part of" notBackBtn>
      <main className="w-full font-inter flex flex-col gap-10 justify-between">
        <div className="flex flex-col gap-4 w-full h-auto justify-center">
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 px-4">
            {isLoading?<Loader2/>:categories?.map((category:any) => (
              <Card category={category} key={category?.id} />
            ))}
          </div>
        </div>
      </main>
    </TitleWrapper>
  );
};

const Card = ({ category }: { category: Category }) => {
  const {MutateFunc} = useMutate()
  const router = useRouter();
  const selectCategory = async (id:number|undefined) => {
    const res = await MutateFunc({url:'/auth/users/category',method:'POST', body:{categoryId:id}, tags:'', onSuccess:(result:any)=>{
      console.log(result)
    if (result?.user?.isVerified) {
      router.push("/welcome");
    } else {
      router.push("/verify");
    }
    }})
  };

  return (
    <div
      className="flex items-center sm:justify-center justify-start gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg sm:flex-col hover:shadow-xl"
      onClick={() => selectCategory(category?.id)}
    >
      <div>
        <img
          src={`/uploads/categoryIcons/${imagesUrls[category?.name]??'pricipal'}.png`}
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


export default SignupCategorySelectPage;
