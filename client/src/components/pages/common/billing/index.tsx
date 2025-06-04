import React from "react";
import FAQs from "./components/FAQs";
import PackageCard from "./components/packageCard";
import { plans } from "./components/data";

const BillingComponent = () => {
  return (
    <div className="py-10">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10 w-full px-2 mb-20">
        {plans.map((plan, i) => (
          <PackageCard plan={plan} key={i} />
        ))}
      </div>
      <FAQs />
    </div>
  );
};

export default BillingComponent;
