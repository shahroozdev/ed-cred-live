"use client";
import { setUserCategory } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@/types/user";
import { imagesUrls } from "@/types";
import TitleWrapper from "@/components/atoms/titleWrapper";
import { useQuery } from "@/hooks/generalHooks";
import { Loader2 } from "lucide-react";

const SignupCategorySelectPage = () => {
  const { data, isLoading, error } = useQuery({
    url: "/category",
    key: "categories",
  });
  const categories = data?.categories;
  return (
    <TitleWrapper title={"Select Category"} desc="Please select a category you are a part of" notBackBtn>
      <main className="w-full h-screen font-inter flex flex-col gap-10 justify-between">
        <div className="flex flex-col gap-4 w-full h-auto justify-center">
          {/* <div className="w-lg text-center mb-10">
            <div className="font-semibold text-3xl">Select Category</div>
            <div className="font-semibold text-base">
              Please select a category you are a part of
            </div>
          </div> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 px-4">
            {isLoading?<Loader2/>:categories?.map((category:any) => (
              <Card category={category} key={category.id} />
            ))}
          </div>
        </div>
      </main>
    </TitleWrapper>
  );
};

const Card = ({ category }: { category: Category }) => {
  const router = useRouter();
  const selectCategory = async () => {
    if (!category.id) {
      console.error("Category ID is not defined");
      return;
    }

    const response = await setUserCategory(category.id);

    if (response.error) {
      toast.error(response.message);
      return;
    }

    if (response.requiresVerification) {
      router.push("/user/verify/");
    } else {
      router.push("/user/welcome");
    }
  };

  return (
    <div
      className="flex items-center sm:justify-center justify-start gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg sm:flex-col hover:shadow-xl"
      onClick={() => selectCategory()}
    >
      <div>
        <img
          src={`/uploads/categoryIcons/${imagesUrls[category?.name]}.png`}
          width={200}
          height={300}
          alt={category.name}
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

const CategoryCard = ({ category }: { category: Category }) => {
  const router = useRouter();
  const selectCategory = async () => {
    if (!category.id) {
      console.error("Category ID is not defined");
      return;
    }

    const response = await setUserCategory(category.id);

    if (response.error) {
      toast.error(response.message);
      return;
    }

    console.log(response.requiresVerification);

    if (response.requiresVerification) {
      router.push("/user/verify/");
    } else {
      router.push("/user/welcome");
    }
  };

  return (
    <div
      className="p-4 border-2 border-muted rounded-md hover:border-primary transition-colors cursor-pointer"
      onClick={selectCategory}
    >
      {category.name}
    </div>
  );
};

export default SignupCategorySelectPage;
