"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import CustomAccordion from "@/components/atoms/accordian";
import UploadFilePreview from "@/components/atoms/uploadAndPreview";
import { Textarea } from "@/components/ui/textarea";
import { types } from "@/data/constant";
import { useMutate } from "@/hooks/generalHooks";
import PLink from "@/components/atoms/link";
import { useParams } from "next/navigation";
import React from "react";
import AccordionDispute from "./components/accordion";
import StripeElement from "@/lib/stripeElement";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { disputeSchema } from "@/lib/schemas";
import { usePRouter } from "@/hooks/useRouter";

const CreateDispute = () => {
  const params = useParams();
  const { MutateFunc, isPending } = useMutate();
  const router = usePRouter();
  const form = useForm({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      reason: "",
      attachment: undefined,
      agreeTerms: false as true, // bypass TS error but keep logic
    },
  });
  const onSubmit = async (data: Record<string, any>) => {
    await MutateFunc({
      url: `/disputes/create/${params?.id ?? 0}`,
      method: "POST",
      body: data,
      onSuccess:()=>router.back(),
      allowMulti: true,
    });
  };
  return (
    <>
      <FormTemplate
        onSubmit={onSubmit}
        customForm={form}
        schema={disputeSchema}
        defaultValues={{}}
        className="space-y-2 border border-solid p-4 rounded-lg shadow-sm bg-gray-50 my-4"
      >
        <FormFeilds fieldProps={{ name: "reason" }} label={{ text: "Reason" }}>
          {(field) => (
            <Textarea
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <UploadFilePreview
          inputName={"attachment"}
          label={"Attachment"}
          allowTypes={types["all"]}
        />
        <AccordionDispute />
        <FormFeilds
          fieldProps={{
            name: `agreeTerms`,
            className: "y-8 space-y-2",
          }}
        >
          {(field) => (
            <div className="flex gap-2 items-start">
              <input
                type={"checkbox"}
                {...field}
                onChange={field.onChange}
                className="peer accent-primary h-4 w-4 border border-gray-300 border-solid rounded-md"
              />
              <span className="text-sm text-black">
                I agree to the{" "}
                <span className="text-primary font-semibold">
                  Dispute Claims Process,{" "}
                </span>
                <PLink
                  href={"/terms-of-use"}
                  className="text-primary font-semibold"
                >
                  Terms of Service
                </PLink>{" "}
                and{" "}
                <PLink
                  href={"/web-use-policy"}
                  className="text-primary font-semibold"
                >
                  Privacy Policy.
                </PLink>
              </span>
            </div>
          )}
        </FormFeilds>
      </FormTemplate>
      <div className="border border-solid p-4 rounded-lg shadow-sm bg-gray-50 my-4">
        <StripeElement amount={100} form={form} onSubmit={onSubmit}/>
      </div>

    </>
  );
};

export default CreateDispute;
