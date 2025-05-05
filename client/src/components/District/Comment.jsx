const CommentSection = () => {
    return (
        <div className="w-5xl bg-white p-4 ">
            <label className=" text-sm text-[#2D2D2D] mb-2">
                Please add your comments below
            </label>
            <p className="text-sm text-[#2D2D2D] mb-2">
                Reviews with comments take posting priority
            </p>
            <textarea
                className="w-full h-32 p-3 border rounded-md"
                placeholder="Write your review here..."
            ></textarea>
            <p className="text-sm text-red-500 mt-2">
                Note: Please avoid submitting AI-generated reviews. The human experience is what ISR is all about.
            </p>

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

export default CommentSection;
