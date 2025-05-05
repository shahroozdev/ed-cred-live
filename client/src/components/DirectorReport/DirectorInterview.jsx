const DirectorInterview = () => {
    return (
        <div className="w-5xl bg-white p-4 ">
            <div className="flex flex-col items-center">
                <p className=" text-m  text-[#2D2D2D] mb-2">
                    Please add your comments below
                </p>
                <p className="text-m  text-[#2D2D2D] mb-2">
                    Reviews with comments take posting priority
                </p>
                <p className="text-sm mb-3 text-[#439E5E]">
                    Note: Please avoid submitting AI generated reviews. The human experience is what ISR is all about.
                </p>
            </div>
            <div className="py-3">
                <p className="font-bold text-sm  text-[#676767]">
                    Director's interviewing style and information that will help candidates
                </p>
                <p className="text-sm  text-[#676767]">
                    Did this director keep to the schedule or were you kept waiting? Was an invitation to interview in your candidate's mailbox? Did the interview focus on your
                </p>
                <p className="text-sm text-[#676767]">
                    teaching skills or was it a casual conversation with the intent to see if you would be a good "fit"? Feel free to expand on these suggestions.
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>

            {/* AfterInterview */}
            <div className="py-3">
                <p className="font-bold text-sm  text-[#676767]">
                    After the interview
                </p>
                <p className="text-sm w-screen text-[#676767]">
                    Were you left dangling, waiting for a decision while other candidates were interviewed? Were you offered a school handbook to review before signing a contract?
                </p>
                <p className="text-sm text-[#676767]">
                    If you won the position, did you find the school and school community as described by the director? Feel free to expand on these suggestions.
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>
            {/* Additional Comment */}
            <div className="py-3">
                <p className="text-sm text-[#676767]">
                    Additional comments, most outstanding characteristic of this director, etc.
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>
            <p className="text-sm text-[#2D2D2D]  mt-4">
                Conditions of Submission: Before you submit your review to ISR, please be certain the contents of your review are exactly what you intend
            </p>
            <p className="text-sm text-[#2D2D2D]">
                to share with the international teaching community. Your school review is anonymous, even to us at ISR. For this reason, we are not able
            </p>
            <p className="text-sm text-[#2D2D2D]">
                to respond to requests to delete, change, or edit reviews. Submission of a review is an irreversible action. By clicking the submit button
            </p>
            <p className="text-sm text-[#2D2D2D]">
                you confirm that you AGREE to abide by our Terms of Use. (Your Review will remain intact if you wish to reread the Terms of Use.)
            </p>

            <button className=" w-auto h-auto bg-[#439E5E] text-white px-10 py-1 mx-70 mt-4 rounded-sm hover:bg-green-600 transition duration-200">
                CLICK TO SUBMIT YOUR SCHOOL FEEDBACK
            </button>
        </div>
    );
};

export default DirectorInterview;
