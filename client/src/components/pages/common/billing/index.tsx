import FAQs from "./components/FAQs";
import PackageCard from "./components/packageCard";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const BillingComponent = async() => {
  const packages = await getServerSideDataWithFeatures({url:'/packages', key:'packages'})
  return (
    <div className="py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-20 w-full px-2 mb-20">
        {packages?.map((plan:Record<string, any>, i:number) => (
          <PackageCard plan={plan} key={i} />
        ))}
      </div>
      <FAQs />
    </div>
  );
};

export default BillingComponent;
