import Management from "./ManagementStyle";

const FeedbackRatings = () => {
    const feedbackItems = [
        "Fair & equitable with all staff",
        "Good listener, easily approachable",
        "Provides disciplinary support",
        "Displays effective leadership",
        "Delegates responsibility well",
        "Demonstrates curriculum knowledge",
        "Fosters positive, supportive climate",
        "Strong ability to relate to kids",
        "Overall rating",
        "Check the correct statement:",
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
                <Management/>
            </div>
        </div>
    );
};

export default FeedbackRatings;
