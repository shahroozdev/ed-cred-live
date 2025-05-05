const Management = () => {
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
            <div className="py-2">
                <p className="font-bold text-md py-4 text-[#2D2D2D]">
                    Management style
                </p>
                <p className="text-sm  text-[#676767]">
                    Does this Principal value teachers as leaders and use teacher input to make real changes? Does he/she have a clear vision for the school and motivate staff by
                </p>
                <p className="text-sm text-[#676767]">
                    example? Feel free to expand on these points.
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>

            {/* Academic & disciplinary support */}
            <div className="py-3">
                <p className="font-bold text-md py-4 text-[#2D2D2D]">
                    Academic & disciplinary support
                </p>
                <p className="text-sm w-screen text-[#676767]">
                    Are teachers supported in issues involving parents & students? What about issues between staff? Is academic integrity respected by this Principal, or are
                </p>
                <p className="text-sm text-[#676767]">
                    teachers told what to teach & encouraged to "assist" students in passing with good grades?
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>
            {/* Hiring Process */}
            <div className="py-3">
                <p className="font-bold text-md py-4 text-[#2D2D2D]">
                    Hiring Process
                </p>
                <p className="text-sm w-screen text-[#676767]">
                    Was this Principal involved in the hiring process? Did you interview with him/her? Describe the process. Would you recommend a colleague work for this
                </p>
                <p className="text-sm text-[#676767]">
                    Principal?
                </p>
            </div>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
            ></textarea>

            {/* Additional Comment */}
            <div className="py-3">
                <p className="font-bold text-md py-4 text-[#2D2D2D]">
                    Additional Comments
                </p>
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

export default Management;
