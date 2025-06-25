"use client";
import React, { Dispatch, SetStateAction } from "react";
import Button from "../button/Button";
import { Flag } from "lucide-react";
import { CustomModal } from "@/components/molecules";
import FormTemplate, { FormFeilds } from "../form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import UploadFilePreview from "../uploadAndPreview";
import { useMutate } from "@/hooks/generalHooks";
import { types } from "@/data/constant";
import CustomAccordion from "../accordian";
import Link from "next/link";

const DisputeBtn = ({ id, disabled }: { id: number; disabled: boolean }) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (
    data: Record<string, any>,
    setIsOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    await MutateFunc({
      url: `/disputes/${id}`,
      method: "POST",
      body: data,
      allowMulti: true,
      onSuccess: () => setIsOpen(false),
    });
  };
  return (
    <>
      {disabled ? (
        <Button
          variant="ghost"
          icon={<Flag stroke="black" fill="black" />}
          disabled
        >
          {" "}
          {"  Disputed"}
        </Button>
      ) : (
        <Link href={`/create-dispute/${id}`}>
          <Button variant="ghost" icon={<Flag />}>
            {" "}
            {"  Dispute this Review"}
          </Button>
        </Link>
        // <CustomModal
        //   title="Dispute Form"
        //   trigger={
        //     <Button variant="ghost" icon={<Flag />}>
        //       {" "}
        //       {"  Dispute this Review"}
        //     </Button>
        //   }
        // >
        //   {(setIsOpen) => (
        //     <FormTemplate
        //       onSubmit={(data) => onSubmit(data, setIsOpen)}
        //       schema={z.any()}
        //       defaultValues={{}}
        //     >
        //       <FormFeilds
        //         fieldProps={{ name: "reason" }}
        //         label={{ text: "Reason" }}
        //       >
        //         {(field) => (
        //           <Textarea
        //             {...field}
        //             value={field.value}
        //             onChange={field.onChange}
        //           />
        //         )}
        //       </FormFeilds>
        //       <UploadFilePreview
        //         inputName={"attachment"}
        //         label={"Attachment"}
        //         allowTypes={types["all"]}
        //       />
        //       <div className="border-2 border-muted rounded mb-2 h-auto">
        //         <CustomAccordion
        //           items={[
        //             {
        //               title: (
        //                 <p className="md:text-base text-sm font-semibold">
        //                   Dispute Claims Process
        //                 </p>
        //               ),
        //               desc: (
        //                 <div className="text-xs [&>ol>li]:ml-2">
        //                   <p>
        //                     If you wish to dispute a review or claim made on
        //                     Ed-Cred, please follow the steps below:
        //                   </p>
        //                   <ol>
        //                     <li>
        //                       <strong>Submit Your Dispute Request</strong>
        //                       <br />
        //                       Begin by submitting a formal dispute request
        //                       through the <strong>Dispute Claim</strong> section
        //                       on our platform. Clearly state the specific review
        //                       or claim you wish to dispute.
        //                     </li>
        //                     <li>
        //                       <strong>
        //                         Provide Supporting Documentation (If Applicable)
        //                       </strong>
        //                       <br />
        //                       If available, provide any official documentation
        //                       that supports your claim. This could include
        //                       relevant records, reports, or other official
        //                       verification to reinforce your position.
        //                     </li>
        //                     <li>
        //                       <strong>
        //                         Provide Contact Information for Verification (If
        //                         Applicable)
        //                       </strong>
        //                       <br />
        //                       If possible, provide contact information for a
        //                       relevant party (e.g., a supervisor, administrator,
        //                       or official entity) who can verify the validity of
        //                       your dispute. This will assist in the verification
        //                       process if needed.
        //                     </li>
        //                     <li>
        //                       <strong>Pay the Service Fee</strong>
        //                       <br />
        //                       <strong>$100 service fee</strong> must be paid to
        //                       process and review your dispute. This fee must be
        //                       paid before Ed-Cred can begin reviewing the claim.
        //                       You can make secure payments through the platform.
        //                     </li>
        //                     <li>
        //                       <strong>Ed-Cred Review</strong>
        //                       <br />
        //                       Once we receive your dispute request and payment,
        //                       Ed-Cred will begin the review process. We will
        //                       evaluate the submitted documentation and
        //                       interviews and assess whether the disputed claim
        //                       can be verified or invalidated.
        //                       <br />
        //                       <em>Please note</em> that the review process may
        //                       take up to <strong>two months</strong>, depending
        //                       on the time it takes to receive responses from the
        //                       contacts provided for verification.
        //                     </li>
        //                     <li>
        //                       <strong>Outcome and Action</strong>
        //                       <br />
        //                       If the dispute is validated and supported by
        //                       sufficient documentation, the review or claim may
        //                       be removed or corrected. If the dispute cannot be
        //                       validated, the review will remain as is. You will
        //                       be notified of the outcome via email.
        //                     </li>
        //                     <li>
        //                       <strong>Final Decision</strong>
        //                       <br />
        //                       All dispute decisions are final. We encourage
        //                       transparency and fairness in resolving disputes,
        //                       but once the outcome is determined, no further
        //                       revisions to the claim or review will be made.
        //                     </li>
        //                   </ol>
        //                 </div>
        //               ),
        //             },
        //           ]}
        //           className="transition-all duration-300 ease-in-out space-y-3 p-2"
        //         />
        //       </div>
        //       <FormFeilds
        //         fieldProps={{
        //           name: `agreeTerms`,
        //           className: "y-8 space-y-2",
        //         }}
        //       >
        //         {(field) => (
        //           <div className="flex gap-2 items-start">
        //             <input
        //               type={"checkbox"}
        //               {...field}
        //               onChange={field.onChange}
        //               className="peer accent-primary h-4 w-4 border border-gray-300 rounded-md"
        //             />
        //             <span className="text-sm">
        //               I agree to the{" "}
        //               <span className="text-primary font-semibold">
        //                 Dispute Claims Process,{" "}
        //               </span>
        //               <Link
        //                 href={"/terms-of-use"}
        //                 className="text-primary font-semibold"
        //               >
        //                 Terms of Service
        //               </Link>{" "}
        //               and{" "}
        //               <Link
        //                 href={"/web-use-policy"}
        //                 className="text-primary font-semibold"
        //               >
        //                 Privacy Policy.
        //               </Link>
        //             </span>
        //           </div>
        //         )}
        //       </FormFeilds>
        //       <div className="flex justify-end">
        //         <Button variant="primary" loading={isPending} type="submit">
        //           Save
        //         </Button>
        //       </div>
        //     </FormTemplate>
        //   )}
        // </CustomModal>
      )}
    </>
  );
};

export default DisputeBtn;
