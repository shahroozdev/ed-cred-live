import BillingComponent from "@/components/pages/common/billing";
import { TitleWrapper } from "@/components/atoms";
import { Footer } from "@/components/organisms";
import FAQs from "@/components/pages/common/billing/components/FAQs";
import PackageCardSkeleton from "@/skeletons/PackageCardSkeleton";
import FetchWithSuspension from "@/components/molecules/fetchWithSuspension";

const PricingPage = () => {
  return (
    <main className="w-full font-inter bg-green-600 text-white !mb-0">
      <TitleWrapper
        title="Pricing Plans"
        desc={
          <p className="text-white">Choose a plan that is right for you.</p>
        }
        notBackBtn
      >
        <div className="py-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-20 w-full px-2 mb-20">
            <FetchWithSuspension
              suspension={
                <>
                  {Array.from({ length: 3 })?.map((_,i) => (
                    <PackageCardSkeleton key={i}/>
                  ))}
                </>
              }
              apiData={{
                url: "/packages",
                key: "packages",
              }}
            >
              {(data) => <BillingComponent data={data} />}
            </FetchWithSuspension>
          </div>
          <FAQs />
        </div>
      </TitleWrapper>
      <Footer />
    </main>
  );
};

export default PricingPage;
