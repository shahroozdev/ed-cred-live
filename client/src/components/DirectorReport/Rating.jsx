import DirectorInterview from "./DirectorInterview";

const FeedbackRatings = () => {
    const feedbackItems = [
        "Fair",
        "Genuine",
        "Flexible",
        "Consistent",
        "Transparent",
        "A Person of Integrity ",
        "A Person who acts with Respect",
        "Overall Rating",
        "Check the correct Statement",
    ];

    return (
        <div className="py-15">
            <div className="w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-xl font-semibold text-center mb-4">Feedback</h2>
                <div className="space-y-2">
                    {feedbackItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between  bg-[#F7F7F7] p-3 rounded-md">
                            <span className="w-2/3">{item}</span>
                        </div>
                    ))}
                </div>
                <DirectorInterview/>
            </div>
        </div>
    );
};

export default FeedbackRatings;
