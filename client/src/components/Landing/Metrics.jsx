import React from 'react'

const Metrics = () => {

    const MetricsData = [
        { value: "10k+", title: "School Feedbacks" },
        { value: "931k+", title: "Community Forum" },
        { value: "240k+", title: "Expert Insights" },
        { value: "12k+", title: "Verfied Feedbacks" },
    ];

    return (
        <div className="flex w-full items-center justify-center bg-[#F5F8F3] py-40 text-center font-sans font-[400]">
            <div className='flex w-2/3 flex-col items-center justify-center gap-10'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='text-4xl font-[700]'>Our Metrics Tell the Story</div>
                    <div className='md:w-1/2'>Our metrics component gives you the inside scoop on your success and helps you stay on top of your game in style.</div>
                </div>
                <div className='flex w-full flex-wrap justify-between gap-4 md:flex-nowrap'>
                    {
                        MetricsData.map((metric, index) => <Metric {...metric} key={`metric-${index}`} />)
                    }
                </div>
            </div>
        </div>
    )
}

const Metric = ({ value, title }) => {
    return (
        <div className='flex w-full flex-col items-center justify-center gap-2 rounded-t-2xl border-b-4 border-[#FF6250] bg-white p-10 px-14'>
            <div className='text-4xl font-[700]'>{value}</div>
            <div>{title}</div>
        </div>
    )
}

export default Metrics
