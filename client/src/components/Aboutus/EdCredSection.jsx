import React from 'react';
import Image from 'next/image';

const EdCredSection = () => {
    return (
        <div className="w-6xl mx-auto px-6 md:px-12 py-16 pb-34 bg-white">
            <div className="text-sm flex flex-col md:flex-row items-start md:items-center gap-10">
                {/* Text Section */}
                <div className="md:w-2/3 text-black">
                    <p className="mb-4">
                        At Ed-Cred, we believe in the power of transparency and the importance of honest feedback in the education community. Our platform allows individuals to share their experiences and insights about educational professionals, schools, and institutions, helping others make informed decisions.
                    </p>
                    <p className="mb-4">
                        We are dedicated to creating a space where reviews are unbiased, thoughtful, and respectful. Ed-Cred is committed to maintaining the integrity of our platform by ensuring all reviews are thoroughly moderated, with a focus on providing accurate and reliable information.
                    </p>
                    <p className="mb-4">
                        Our mission is to empower educators, parents, and the wider community by fostering open communication and accountability in education. We aim to make it easier for everyone to find, evaluate, and connect with the best educational resources.
                    </p>
                    <p className="mb-4">
                        We encourage educators, leaders, and school staff members to use the feedback provided on our platform as an opportunity for growth and self-reflection. Constructive feedback helps create a path for continuous improvement, ensuring that schools and educators evolve to meet the ever-changing needs of students and the community.
                    </p>
                    <p className="mb-4">
                        At Ed-Cred, we prioritize privacy, security, and authenticity. All reviews are submitted anonymously, and any supporting documentation provided for serious claims is handled with the utmost care and confidentiality.
                    </p>
                    <p>
                        Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.
                    </p>
                </div>

                {/* Image Section */}
                <div className="relative flex justify-center bottom-20 left-20 ">
                    {/* Larger Image */}
                    <div className="relative w-5 h-56 md:w-55 md:h-55 md:-right-20">
                        <Image
                            src="/AboutUs/Papers.jpeg"
                            alt="Educational setting"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl border-7 border-white shadow-lg"
                        />
                    </div>

                    {/* Overlapping Smaller Image */}
                    <div className="absolute w-40 h-40 md:w-50 md:h-60 top-28  md:top-40 ">
                        <Image
                            src="/AboutUs/meeting.jpeg"
                            alt="Learning environment"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl border-7 border-white shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EdCredSection
