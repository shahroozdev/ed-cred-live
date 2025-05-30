import TitleWrapper from "@/components/atoms/titleWrapper";
import { SubCategoryCard } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const SignupCategorySelectPage = async() => {
  const data = await getServerSideDataWithFeatures({
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
            {categories?.map((category:any) => (
              <SubCategoryCard category={category} key={category?.id} />
            ))}
          </div>
        </div>
      </main>
    </TitleWrapper>
  );
};




export default SignupCategorySelectPage;
