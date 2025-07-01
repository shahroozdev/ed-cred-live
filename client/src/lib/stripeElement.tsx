"use client";
import React, { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToCents } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@/components/atoms";
import { Loader2 } from "lucide-react";
import { useMutate } from "@/hooks/generalHooks";

// Create a new CheckoutForm component to handle the payment submission
const CheckoutForm = ({
  clientSecret,
  amount,
  form,
  onSubmit
}: {
  clientSecret: string;
  amount: number;
  form?: any;
  onSubmit?:(values:any)=>void
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();
  const params = useParams();
  const { MutateFunc, isPending } = useMutate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = form ? await form.trigger() : true;
    console.log(isValid, 'isVAlid')
    if (!isValid) return;
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setPaymentError(null);
    const { error } = await elements.submit();
    if (error) {
      setPaymentError(error.message || "An error occurred during payment.");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}${pathname}?paymentSuccess=true`,
      },
    });

    if (confirmError) {
      setPaymentError(
        confirmError.message || "An error occurred during payment."
      );
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      if (form && onSubmit) {
        await onSubmit(form?.getValues());
      } else {
        await MutateFunc({
          url: "auth/update-package",
          method: "PUT",
          body: { packageId: Number(params?.subscription) },
        });
      }
    }
  };
  // sendTo:'/dashboard'

  return (
    <>
      <form onSubmit={handleSubmit} className="my-5">
        <PaymentElement />
        {paymentError && (
          <div className="text-red-500 mt-2">{paymentError}</div>
        )}
        <Button
          variant="primary"
          type="submit"
          disabled={!stripe || isProcessing || isPending}
          loading={isPending || isProcessing}
          className="w-full rounded mt-4 bg-green-500 text-white py-2 px-4"
        >
          {isProcessing ? "Processing..." : "Check out"} ( ${amount})
        </Button>
      </form>
      <div className="text-center mt-4 text-sm text-gray-500 flex items-center justify-center gap-1">
        <span>Payments secured by</span>
        <img
          src="/images/stripe.png"
          alt="Stripe"
          className="h-5"
        />
      </div>
    </>
  );
};

const StripeElement = ({ amount, form, onSubmit }: { amount: number; form?: any,   onSubmit?:(values:any)=>void }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    console.log( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, 'stripe')
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  useEffect(() => {
    if (!amount) return;

    const getClientSecret = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const totalAmount = amount;

        const res = await fetch("/api/get-stripe-client-secret", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount }),
        });

        if (!res.ok) {
          throw new Error("Failed to get payment intent");
        }

        const data = await res.json();
        if (data.error) {
          setIsError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      } catch (error: any) {
        setIsError(error.message || "Failed to initialize payment");
      } finally {
        setIsLoading(false);
      }
    };

    getClientSecret();
  }, [amount]);

  return (
    <div className="my-5">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            // clientSecret,
            mode: "payment",
            currency: "usd",
            amount: convertToCents(amount),
          }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse !h-16 rounded !w-full bg-gray-200"/>
              <div className="animate-pulse !h-16 rounded !w-full bg-gray-200"/>
              <div className="animate-pulse !h-16 rounded !w-full bg-gray-200"/>
            </div>
          ) : (
            <CheckoutForm
              clientSecret={clientSecret}
              amount={amount}
              form={form}
              onSubmit={onSubmit}
            />
          )}
        </Elements>
      )}
    </div>
  );
};

export default StripeElement;
