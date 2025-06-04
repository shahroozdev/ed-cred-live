import BillingComponent from "@/components/pages/common/billing";
import { TitleWrapper } from "@/components/atoms";

const PricingPage = () => {
  return (
    <main className="w-full h-auto font-inter bg-green-600 text-white flex flex-col gap-40 items-center">
      <TitleWrapper
        title="Pricing Plans"
        desc={<p className="text-white">Choose a plan that is right for you.</p>}
        notBackBtn
      >
        <BillingComponent />
      </TitleWrapper>
    </main>
  );
};

export default PricingPage;
