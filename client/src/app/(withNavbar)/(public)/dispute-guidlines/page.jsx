import React from "react";
import Header from "@/components/atoms/titleHeader/Header";

const TermsOfUsePage = () => {
  return (
    <>
      <Header
        title="No Refund Policy"
        description="Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all."
      />
      <div className="max-w-[1400px] w-full m-auto bg-background py-4 md:px-10 px-2">
        <p className="text-[#686C70] my-3 ">
          Effective Date: <strong>May 25, 2025</strong>
        </p>
        <p className="text-[#686C70]">
          At Ed-Cred, we strive to provide transparent and effective services to support honest reviews and educational accountability. Please review the following policy regarding payments made through our platform.
        </p>
        <h2 className="text-2xl font-semibold my-3 ">
          1. Dispute Processing Fee
        </h2>
        <p className="text-[#686C70]">
          The $100 fee paid to initiate a review dispute is non-refundable. This fee covers administrative costs associated with processing, verifying, and reviewing submitted documentation. Payment is required at the time of submission, and no refunds will be issued once the process has started, regardless of the outcome.
        </p>
        <h2 className="text-2xl font-semibold my-3">
          2. Exceptional Circumstances
        </h2>
        <p className="text-[#686C70]">
          Refunds will only be considered in cases of:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>
            Duplicate charges (must be reported within 7 days)
          </li>
          <li>
            Platform errors resulting in service failure or unintentional billing
          </li>
        </ul>
        <h2 className="text-2xl font-semibold my-3">
          3. Acknowledgment
        </h2>
        <p className="text-[#686C70]">
          By submitting payment through Ed-Cred, you acknowledge that you have read, understood, and agree to this No Refund Policy.
        </p>
      </div>
    </>
  );
};

export default TermsOfUsePage;
