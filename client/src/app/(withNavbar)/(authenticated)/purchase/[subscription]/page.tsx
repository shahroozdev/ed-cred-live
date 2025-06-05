import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import StripeElement from "@/lib/stripeElement";
import Link from "next/link";
import React, { use } from "react";

const PackagePurchase = async ({
  params,
}: {
  params: Promise<{ subscription: string }>;
}) => {
  const { subscription } = await params;
  const Package = await getServerSideDataWithFeatures({
    url: `/packages/${subscription}`,
    key: "packages",
  });

  return (
    <TitleWrapper title="  " notBackBtn>
      <>
        {!Package.error ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold ">Confirm Your Plan</h1>
              <p className="mt-2 text-gray-600">
                You're subscribing to the{" "}
                <span className="font-semibold text-indigo-600">
                  {Package?.title}
                </span>{" "}
                plan
              </p>
              <p className="text-4xl font-extrabold text-indigo-700 mt-3">
                ${Package?.price}{" "}
                <span className="text-base text-foreground">/ month</span>
              </p>
            </div>

            {/* Features List */}
            <div className="mb-8 bg-gray-50 p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                What you get:
              </h2>
              <ul className="space-y-3 text-gray-700">
                {Package?.features?.map((feature: string, i: number) => (
                  <li className="flex items-start gap-2" key={i}>
                    ✅ {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold my-4">Payment Details</h3>
              <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <StripeElement amount={Number(Package!.price)} />
              </div>
            </div>
            {/* Powered by Stripe */}
            <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-1">
              <span>Payments secured by</span>
              <img
                src="https://stripe.com/img/v3/home/social.png"
                alt="Stripe"
                className="h-5"
              />
            </div>
          </>
        ) : (
          // Custom 404
          <div className="flex flex-col items-center justify-center py-16">
            <h2 className="text-3xl font-bold text-red-600">404 - Not Found</h2>
            <p className="mt-2 text-gray-600 text-center max-w-md">
              The package you're trying to purchase doesn't exist or has been
              removed.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-block cursor-pointer bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition"
            >
              View Available Packages
            </Link>
          </div>
        )}
      </>
    </TitleWrapper>
  );
};

export default PackagePurchase;
