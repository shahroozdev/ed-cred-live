import Image from "next/image"
import Button from "@/components/ui/Button"

const About = () => {
    return (
        <div className="my-20 flex flex-col items-center justify-center gap-20 font-[400] md:my-40 md:w-2/3 md:flex-row md:gap-40">
            <div className="flex flex-col items-center gap-8 md:items-start">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <div className="w-max rounded-full bg-[#A1AF001A] px-4 py-2 font-sans text-xs font-[400] tracking-widest text-[#439E5E] md:text-sm">
                        WHO WE ARE
                    </div>
                    <div className="text-4xl">What we do</div>
                </div>
                <div className="px-10 text-center text-base text-pretty md:px-0 md:text-left md:text-xl">
                    Ed-Cred is a platform dedicated to fostering transparency and accountability in education. We provide a space for honest, anonymous reviews of educators, schools, and institutions. Our mission is to empower the education community by sharing insights that help educators, leaders, and school staff grow and improve. Join us in creating a more informed and collaborative educational experience for all.
                </div>
                <div>
                    <Button>Read More About Us</Button>
                </div>
            </div>
            <Image src={'/icons/about-image.png'} width={900} height={800} alt="about-image" className="w-80 md:w-auto" />
        </div>
    )
}

export default About;
