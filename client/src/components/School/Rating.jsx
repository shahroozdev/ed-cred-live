'use client'
import CommentSection from "./Comment";

const FeedbackRatings = () => {
    const feedbackItems = [
        "Academic integrity of school",
        "Effectiveness of administration",
        "Academic & disciplinary support provided",
        "Director’s involvement in academics",
        "Fair & equitable treatment by board & director",
        "School has adequate educational materials on hand",
        "Attitude of local community towards foreigners",
        "Cost of living in relation to salary (10 = most favorable)",
        "Satisfaction with housing",
        "Community offers a variety of activities",
        "Availability & quality of local health care",
        "Satisfaction with school health insurance policy",
        "Family friendly / child friendly school & communit",
        "Assistance with visas, shipping & air travel",
        "Extra-curricular activities load is reasonable",
        "Security / personal safety (10 = very safe)",
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
                <CommentSection/>
            </div>
        </div>
    );
};

export default FeedbackRatings;
