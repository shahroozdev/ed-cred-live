import CustomAccordion from "@/components/atoms/accordian";
import React from "react";

const AccordionDispute = () => {
  return (
    <div className="border-2 border-red-300 border-solid rounded-xl mb-2 h-auto bg-red-100">
      <CustomAccordion
        items={[
          {
            title: (
              <div className="text-red-500">
                <p className="md:text-base text-sm">
                  <b>$100 service fee</b> must be paid to process and review
                  your dispute. This fee must be paid before Ed-Cred can begin
                  reviewing the claim. You can make secure payments through the
                  platform.
                </p>
              </div>
            ),
            desc: (
              <div className="md:text-base text-sm text-black [&>ol>li]:ml-2 ml-4">
                <p className="md:text-base text-sm font-semibold">
                  Dispute Claims Process
                </p>
                <p>
                  If you wish to dispute a review or claim made on Ed-Cred,
                  please follow the steps below:
                </p>
                <ol>
                  <li>
                    <strong>Submit Your Dispute Request</strong>
                    <br />
                    Begin by submitting a formal dispute request through the{" "}
                    <strong>Dispute Claim</strong> section on our platform.
                    Clearly state the specific review or claim you wish to
                    dispute.
                  </li>
                  <li>
                    <strong>
                      Provide Supporting Documentation (If Applicable)
                    </strong>
                    <br />
                    If available, provide any official documentation that
                    supports your claim. This could include relevant records,
                    reports, or other official verification to reinforce your
                    position.
                  </li>
                  <li>
                    <strong>
                      Provide Contact Information for Verification (If
                      Applicable)
                    </strong>
                    <br />
                    If possible, provide contact information for a relevant
                    party (e.g., a supervisor, administrator, or official
                    entity) who can verify the validity of your dispute. This
                    will assist in the verification process if needed.
                  </li>
                  <li>
                    <strong>Pay the Service Fee</strong>
                    <br />
                    <strong>$100 service fee</strong> must be paid to process
                    and review your dispute. This fee must be paid before
                    Ed-Cred can begin reviewing the claim. You can make secure
                    payments through the platform.
                  </li>
                  <li>
                    <strong>Ed-Cred Review</strong>
                    <br />
                    Once we receive your dispute request and payment, Ed-Cred
                    will begin the review process. We will evaluate the
                    submitted documentation and interviews and assess whether
                    the disputed claim can be verified or invalidated.
                    <br />
                    <em>Please note</em> that the review process may take up to{" "}
                    <strong>two months</strong>, depending on the time it takes
                    to receive responses from the contacts provided for
                    verification.
                  </li>
                  <li>
                    <strong>Outcome and Action</strong>
                    <br />
                    If the dispute is validated and supported by sufficient
                    documentation, the review or claim may be removed or
                    corrected. If the dispute cannot be validated, the review
                    will remain as is. You will be notified of the outcome via
                    email.
                  </li>
                  <li>
                    <strong>Final Decision</strong>
                    <br />
                    All dispute decisions are final. We encourage transparency
                    and fairness in resolving disputes, but once the outcome is
                    determined, no further revisions to the claim or review will
                    be made.
                  </li>
                </ol>
              </div>
            ),
          },
        ]}
        className="transition-all duration-300 ease-in-out space-y-3 p-2"
      />
    </div>
  );
};

export default AccordionDispute;
