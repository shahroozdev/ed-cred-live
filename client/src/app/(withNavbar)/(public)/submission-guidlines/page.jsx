import React from "react";
import Header from "@/components/atoms/titleHeader/Header";

const TermsOfUsePage = () => {
  return (
    <>
      <Header
        title="Review Submission Guidelines"
        description="Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all."
      />
      <div>
        <h2 className="text-2xl font-semibold my-3 ">Submission Guidelines:</h2>
        <p className="text-[#686C70] ">
          Before submitting your review to Ed-Cred, ensure it accurately
          reflects your feedback. All reviews are anonymous and final once
          submitted, and we cannot modify or delete them.
          <br />
          <br />
          If your review includes serious allegations (e.g., serious
          misconduct), you must provide supporting documentation; without it,
          the review cannot be published. Claims backed by official
          documentation will receive a "Verified Stamp.”
          <br />
          <br />
          Use of profanity, offensive language, or inappropriate content will
          automatically result in the review being rejected and not published.
          <br />
          <br />
          Any uploaded documents will be securely stored for verification
          purposes only, not posted publicly, and will be transferred to an
          external hard drive for protection.
          <br />
          <br />
          By uploading documents, you grant Ed-Cred permission to view your name
          or your child’s name solely for verification purposes. All other
          student names must be redacted to maintain confidentiality.
        </p>
      </div>
    </>
  );
};

export default TermsOfUsePage;
