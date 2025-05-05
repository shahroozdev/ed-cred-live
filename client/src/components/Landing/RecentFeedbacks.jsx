"use client";
import { useState, useEffect } from "react";
import { AppleIcon } from "lucide-react";
import { getRequest } from "@/api/config";

const Feedbacks = () => {

    const [feedbacks, setFeedbacks] = useState([]);
    const setup = async() => {
        const res = await getRequest("/feedback-responses/recent/")
        const body = await res.json();
        setFeedbacks(body);
    }
    const colors = [ "#FF5050", "#439E5E", "#FFC944", "#3A8DFF"];

    useEffect(() => {
        setup();
    }, []);

    return (
        <div className="my-20 flex h-auto w-full flex-col items-center justify-center gap-14 md:my-40">
            <div className='flex flex-col items-center justify-center gap-4'>
                <div className='text-3xl font-[400] md:text-4xl'>Recent <span className="font-[700]">Feedbacks</span></div>
                <div className='text-sm md:text-base'>See how our forum is making an impact!</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 px-10 md:w-2/3 md:flex-row md:gap-14 md:p-0 ">
                {
                    feedbacks.map((feedback, index) => <Card name={feedback.details.schoolName} desc={feedback.details.schoolCountry} review={feedback.comments} color={colors[index]} key={`card-${index}`} />)
                }
            </div>
        </div>
    )
}

const Card = ({ name, desc, review, color }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-center shadow-lg md:w-1/4">
            <div className="flex flex-col items-center justify-center gap-1">
                <div className="text-xl font-[600]">{name}</div>
                <div className="font-[400] text-[#374151] text-ellipsis line-clamp-3">{desc}</div>
            </div>
            <div className="font-[400] text-ellipsis line-clamp-2">{review}</div>
            <div className="flex gap-2 mt-auto">
                {
                    Array.from({ length: 5 }).map((_, idx) => <AppleIcon fill={idx < 4 ? color : "transparent"} stroke={color} key={`apple-${idx}`}/>)

                }
            </div>
        </div>
    )
}

export default Feedbacks;
