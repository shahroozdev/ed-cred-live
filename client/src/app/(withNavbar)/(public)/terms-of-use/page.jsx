import React from "react";
import Header from "@/components/Common/Header";
import TermsOFUse from "@/components/Termsofuse/TermsOfUse";


const TermsOfUsePage = () => {
  return (
    <>
      <Header
        title="Terms Of Use"
        description="Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all."
      />
      <TermsOFUse />
    </>
  );
};

export default TermsOfUsePage;
