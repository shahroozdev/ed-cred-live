import React from "react";
import Header from "@/components/atoms/titleHeader/Header";

const TermsOfUsePage = () => {
  return (
    <>
      <Header
        title="Dispute Claims Process"
        description="Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all."
      />
      <div className="max-w-[1400px] w-full m-auto bg-background py-4 md:px-10 px-2">
        <p className="text-[#686C70] my-3 ">
          Effective Date: <strong>May 25, 2025</strong>
        </p>
        <p className="text-[#686C70]">
          If you wish to dispute a review or claim made on Ed-Cred, please follow the steps below:
        </p>
        <h2 className="text-2xl font-semibold my-3 ">
          1. Submit Your Dispute Request
        </h2>
        <p className="text-[#686C70]">
          Begin by submitting a formal dispute request through the Dispute Claim section on our platform. Clearly state the specific review or claim you wish to dispute.
        </p>
        <h2 className="text-2xl font-semibold my-3">
          2. Provide Supporting Documentation (If Applicable)
        </h2>
        <p className="text-[#686C70]">
          If available, provide any official documentation that supports your claim. This could include relevant records, reports, or other official verification to reinforce your position.
        </p>
        
        <h2 className="text-2xl font-semibold my-3">
          3. Provide Contact Information for Verification (If Applicable)
        </h2>
        <p className="text-[#686C70]">
          If possible, provide contact information for a relevant party (e.g., a supervisor, administrator, or official entity) who can verify the validity of your dispute. This will assist in the verification process if needed.
        </p>
        
        <h2 className="text-2xl font-semibold my-3">
          4.	Pay the Service Fee
        </h2>
        <p className="text-[#686C70]">
          A $100 service fee must be paid to process and review your dispute. This fee must be paid before Ed-Cred can begin reviewing the claim. You can make secure payments through the platform.
        </p>
        
        <h2 className="text-2xl font-semibold my-3">
          5.	Ed-Cred Review
        </h2>
        <p className="text-[#686C70]">
          Once we receive your dispute request and payment, Ed-Cred will begin the review process. We will evaluate the submitted documentation and interviews and assess whether the disputed claim can be verified or invalidated.
          <br />
          <br />
          <b>Please note that </b> the review process may take up to two months, depending on the time it takes to receive responses from the contacts provided for verification.
        </p>
        <h2 className="text-2xl font-semibold my-3">
          6.	Outcome and Action
        </h2>
        <p className="text-[#686C70]">
         If the dispute is validated and supported by sufficient documentation, the review or claim may be removed or corrected. If the dispute cannot be validated, the review will remain as is. You will be notified of the outcome via email.
        </p>
        <h2 className="text-2xl font-semibold my-3">
         7.	Final Decision
        </h2>
        <p className="text-[#686C70]">
          All dispute decisions are final. We encourage transparency and fairness in resolving disputes, but once the outcome is determined, no further revisions to the claim or review will be made.
        </p>
      </div>
    </>
  );
};

export default TermsOfUsePage;
