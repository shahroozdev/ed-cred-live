import React from "react";
import Header from "@/components/atoms/titleHeader/Header";
import TermsOFUse from "@/components/pages/common/Termsofuse/TermsOfUse";

const TermsOfUsePage = () => {
  return (
    <>
      <Header
        title="Ed-Cred Legal Disclaimer and User Content Policy"
        description="Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all."
      />
      <div className="max-w-[1400px] w-full m-auto bg-background py-4 md:px-10 px-2">
        <p className="text-[#686C70] my-3 ">
          Effective Date: <strong>April 26, 2025</strong>
        </p>
        <h2 className="text-2xl font-semibold my-3 ">
          1. User-Generated Content and Platform Neutrality
        </h2>
        <p className="text-[#686C70]">
          All reviews, ratings, and commentary submitted to Ed-Cred are
          considered user-generated content. The views expressed in these
          submissions are solely those of the individual users and do not
          reflect the opinions or positions of Ed-Cred, its owners, or
          affiliates.
          <br />
          <br />
          Ed-Cred does not alter the substance of user submissions unless
          necessary for moderation, legal compliance, or policy enforcement.
          Users remain fully responsible for the content they post.
        </p>
        <h2 className="text-2xl font-semibold my-3">
          2. Legal Protections for the Platform
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>
            In accordance with Section 230 of the Communications Decency Act (47
            U.S.C. § 230), Ed-Cred is not legally liable for content posted by
            third parties. The platform shall not be treated as the publisher or
            speaker of user content and is immune from claims arising from the
            views or experiences shared by its users.
            <br />
            <br />
            Ed-Cred reserves the right to moderate, remove, or retain content in
            line with its mission and policies, without waiving these legal
            protections.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold my-3">
          3. Anti-SLAPP Safeguards
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>
            Where applicable, Ed-Cred and its users are protected by Anti-SLAPP
            (Strategic Lawsuit Against Public Participation) statutes. These
            laws exist to prevent the misuse of litigation to silence speech
            related to matters of public interest.
            <br />
            <br />
            Education is a matter of public concern. Therefore, user reviews
            that address working conditions, school culture, student safety,
            leadership behavior, or other systemic issues may qualify for
            protection. Ed-Cred will assert Anti-SLAPP defenses and may seek
            attorney’s fees and court costs in response to any attempt to
            suppress valid criticism through legal intimidation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold my-3">
          4. Reviews Involving Unlawful Conduct or Serious Misconduct
        </h2>
        <p className="text-[#686C70]">
          Ed-Cred permits users to report experiences involving potentially
          unlawful behavior or serious misconduct, including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>Wrongful termination</li>
          <li>Workplace retaliation or whistleblower suppression</li>
          <li>
            Discrimination based on race, gender, sexual orientation, religion,
            age, or disability
          </li>
          <li>Harassment, including sexual harassment</li>
          <li>Physical or emotional abuse</li>
          <li>Neglect or endangerment of students</li>
          <li>Child abuse or failure to report abuse</li>
          <li>Fraud, theft, or financial misconduct</li>
          <li>Violation of labor laws or unsafe working conditions</li>
        </ul>
        <p className="text-[#686C70]">
          Ed-Cred requires documentation, substantiating details, or other
          verification to support the claim. This process is in place to protect
          against false or malicious accusations while giving space for
          legitimate reporting of harmful behavior and institutional failure.
          <br />
          <br />
          Ed-Cred strongly supports the right of individuals to report abuse and
          misconduct in educational settings. Users are encouraged to speak
          openly while also ensuring that their statements are based on truth
          and personal experience.
        </p>
        <h2 className="text-2xl font-semibold my-3">
          5. Data Privacy and User Rights
        </h2>
        <p className="text-[#686C70]">
          Ed-Cred complies with applicable data privacy laws, including the
          California Consumer Privacy Act (CCPA) and the General Data Protection
          Regulation (GDPR) where applicable. Users have the right to request
          access to, correction of, or deletion of their personal data, subject
          to identity verification and legal exceptions.
          <br />
          <br />
          No personally identifiable information (PII) of individuals—such as
          students or private individuals—will be published unless:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>It is already public through official school channels</li>
          <li>
            It is directly relevant to a public concern (e.g., public-facing
            leadership)
          </li>
          <li>Or it was submitted voluntarily by the user</li>
        </ul>
        <h2 className="text-2xl font-semibold my-3">
          6. Dispute Resolution Process
        </h2>
        <p className="text-[#686C70]">
          Ed-Cred will only respond to content-related complaints that are
          submitted through the Dispute Form. Each submission must include the
          nature of the dispute, the specific content in question, and any
          relevant documentation. Ed-Cred will assess all disputes in good faith
          and respond accordingly, which may include removal, redaction, user
          outreach, or retention.
          <br />
          <br />
          Please note: Content will not be removed simply because it is negative
          or critical. Valid public opinion and experience, even when
          uncomfortable or unfavorable, is protected speech. By using Ed-Cred,
          you acknowledge and agree to the following:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-[#686C70]">
          <li>
            All reviews reflect the subjective opinions of individual users.
          </li>
          <li>
            Ed-Cred is not legally liable for user-submitted content under
            Section 230.
          </li>
          <li>
            Reports of serious misconduct require verification for the claims to
            be posted.
          </li>
          <li>
            Speech addressing public interest, including workplace conditions
            and school leadership, is protected and may trigger Anti-SLAPP
            defenses.
          </li>
          <li>
            Content disputes must be submitted using the Ed-Cred Dispute Form to
            be reviewed.
          </li>
        </ul>
      </div>
    </>
  );
};

export default TermsOfUsePage;
