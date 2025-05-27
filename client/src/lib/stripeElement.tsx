"use client";
import React, { useEffect, useState } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToCents } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/atoms";
import { Loader2 } from "lucide-react";


// Create a new CheckoutForm component to handle the payment submission
const CheckoutForm = ({ clientSecret ,form}: {clientSecret: string, form:any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const {error} = await elements.submit();    
    if(error){
      setPaymentError(error.message || 'An error occurred during payment.');
      setIsProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}${pathname}?paymentSuccess=true`,
      },
    });
    
    if (confirmError) {
      setPaymentError(confirmError.message || 'An error occurred during payment.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      form.submit();
    }
  };



  return (
    <form onSubmit={handleSubmit} className="my-5">
      <PaymentElement />
      {paymentError && <div className="text-red-500 mt-2">{paymentError}</div>}
      <Button 
        type="primary"
        htmlType="submit" 
        disabled={!stripe || isProcessing}
        className="w-full rounded mt-4 bg-green-500 text-white py-2 px-4"
      >
        {isProcessing ? 'Processing...' : 'Check out'}

      </Button>
    </form>
  );
};

const StripeElement = ({ amount ,form}: { amount: number,form:any }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
              <Loader2 />
            </div>
          ) : (
            <CheckoutForm clientSecret={clientSecret} form={form}/>
          )}
        </Elements>
      )}
    </div>
  );
};

export default StripeElement;
