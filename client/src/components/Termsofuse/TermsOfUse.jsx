import React from 'react'

const TermsOFUse = () => {
    return (

        <div className="w-screen my-25 px-60">
            <p className='text-[#686C70] my-3 '>
                Effective Date: <strong>February 12, 2025</strong>
            </p>
            <p className='text-[#686C70] my-5'>
                By accessing or using the Ed-Cred platform ("Platform"), you agree to comply with these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Platform.
            </p>
            <h2 className="text-2xl font-semibold my-3 ">
                General Terms
            </h2>
            <p className='text-[#686C70]'>
                Ed-Cred provides a platform where users can submit anonymous reviews and ratings of educational professionals, schools, and institutions. Reviews submitted through the Platform are intended to foster transparency and provide valuable feedback to the educational community. By submitting a review, you agree that you are submitting truthful and accurate information to the best of your knowledge.
            </p>
            <h2 className="text-2xl font-semibold my-3">Submission Guidelines</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    All reviews are anonymous, even to Ed-Cred.
                </li>
                <li>
                    Reviews submitted on the Platform are final and cannot be edited or altered once submitted, except in the case of a dispute claim.
                </li>
                <li>
                    Dispute Claims: If a review is disputed, and the dispute is validated or reinforced with appropriate supporting documentation, the review may be deleted.
                </li>
                <li>
                    Any serious allegations, such as misconduct or violations, must be supported by official documentation. Reviews containing verified claims will receive a "Verified Stamp" and the verified claims will be bolded to indicate validation.
                </li>
                <li>
                    If a review includes serious allegations without supporting documentation, it will not be published on the Platform.
                </li>
                <li>
                    Use of profanity, offensive language, or inappropriate content will automatically result in the review, post, or comment being rejected and not published on the Platform.
                </li>
                <li>
                    Ed-Cred reserves the right to request additional verification or documentation to support claims.
                </li>
                <li>
                    Document Storage: Any documents uploaded to support claims will be removed from secure cloud-based storage and transferred to a secure external hard drive for protection. These documents will not be posted on the review or the website. They are stored solely for the purpose of review and verification.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Moderation of Reviews</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    Ed-Cred will make reasonable efforts to moderate incoming reviews to ensure they comply with our guidelines and terms. This includes reviewing submitted content for relevance, accuracy, and appropriateness.
                </li>
                <li>
                    All reviews submitted to Ed-Cred are subject to moderation to ensure they comply with our guidelines and terms. This process includes reviewing the content for relevance, accuracy, and appropriateness. However, due to the volume of reviews and the nature of user-generated content, the moderation process may take up to one month to complete.
                </li>
                <li>
                    Reviews may be flagged for further examination if they contain content that violates our guidelines or community standards, including defamatory, harmful, or misleading information.
                </li>
            </ul>

            {/* Verified Claims */}
            <h2 className="text-2xl font-semibold my-3">Verified Claims</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    Any claims in your review that are supported by official documentation will receive a "Verified Stamp" and will be bolded for emphasis.
                </li>
                <li>
                    A "Verified Stamp" indicates that the claim has been reviewed and validated based on official documentation.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Dispute of Claims</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    If you wish to dispute a claim made in a review, you may submit a formal request to Ed-Cred.
                </li>
                <li>
                    There will be a $100 service fee for processing and reviewing any disputes or claims. This fee must be paid before any action is taken regarding the dispute.
                </li>
                <li>
                    Ed-Cred will not be responsible for any claims that are unsubstantiated or fail to meet the required documentation standards.
                </li>
                <li>
                    If a dispute is validated and supporting documentation is provided, the review may be deleted.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Limitation of Liability</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    Ed-Cred is a platform that allows users to share reviews and feedback. As such, Ed-Cred is not responsible for the content submitted by users.
                </li>
                <li>
                    By using the Platform, you acknowledge that Ed-Cred does not endorse, validate, or guarantee the accuracy of any review or claim made by users.
                </li>
                <li>
                    Ed-Cred is protected under the Communications Decency Act (CDA) Section 230, which provides immunity to platforms for content posted by users. This means Ed-Cred is not liable for any statements or claims made by users.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Privacy</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    Ed-Cred is committed to respecting your privacy. All reviews submitted through the Platform are anonymous.
                </li>
                <li>
                    Ed-Cred will not disclose the identity of any reviewer unless required by law or with the express permission of the reviewer.
                </li>
                <li>
                    Document Privacy: Any documents uploaded for verification purposes will be stored securely on an external hard drive and will not be publicly posted on the review or website. They will be used solely for verification and will be kept confidential.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">User Conduct</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <li>
                    By using the Platform, you agree not to submit false, defamatory, or misleading information.
                </li>
                <li>
                    You are responsible for ensuring that your reviews comply with all applicable laws and regulations.
                </li>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Changes to Terms</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <p>
                    Ed-Cred reserves the right to modify or update these Terms of Use at any time. Any changes will be posted on the Platform, and your continued use of the Platform after such changes indicates your acceptance of the revised Terms.
                </p>
            </ul>
            <h2 className="text-2xl font-semibold my-3">Contact Information</h2>
            <ul className="list-disc list-inside space-y-2 text-[#686C70]">
                <p>
                    If you have any questions about these Terms or wish to dispute a claim, please contact us at <strong>email.</strong>
                </p>
            </ul>
        </div>

    )
}

export default TermsOFUse
