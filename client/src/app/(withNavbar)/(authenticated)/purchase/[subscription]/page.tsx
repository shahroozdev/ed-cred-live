"use client";
import { TitleWrapper } from "@/components/atoms";
import { plans } from "@/components/pages/common/billing/components/data";
import StripeElement from "@/lib/stripeElement";
import React, { use } from "react";

const PackagePurchase = ({
  params,
}: {
  params: Promise<{ subscription: string }>;
}) => {
  const {subscription} =use(params)
  const Package =plans.find((key)=>(key.title === subscription))
  console.log(Package)
  return (
    <TitleWrapper title="Purchase Package" notBackBtn>
      <div className="border-2 border-muted rounded-xl w-full p-4">
        <p><b>Package:</b>{" "}<span>{Package?.title}</span></p>
        <p><b>Price:</b>{" "}<span>{Package?.price}</span></p>
        <p><b>Description:</b>{" "}<span>{Package?.description}</span></p>

      </div>
      <StripeElement amount={Number(Package!.price.replace("$",""))} />
    </TitleWrapper>
  );
};

export default PackagePurchase;
