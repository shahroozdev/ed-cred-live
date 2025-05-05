import Image from "next/image";
import Button from "@/components/ui/Button";

const Dissussions = () => {

    const DissucssionCards = [
        { title: "Excepteur sint occaecat cupidatat non proident", image: "1.png", description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli" },
        { title: "Excepteur sint occaecat cupidatat non proident", image: "2.png", description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli" },
        { title: "Excepteur sint occaecat cupidatat non proident", image: "3.png", description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli" },
    ];

    return (
        <div className="relative flex h-auto w-full flex-col items-center justify-center gap-14 py-20 md:py-40">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-max rounded-full bg-[#A1AF001A] px-4 py-2 font-sans text-sm font-[400] tracking-widest text-[#439E5E] md:text-base">
                    LATEST INSIGHTS
                </div>
                <div className="text-3xl font-[400]">Recent <span className="font-bold">Dissucssion</span></div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 px-10 md:w-2/3 md:flex-nowrap md:px-0">
                {
                    DissucssionCards.map((category, index) => <Card {...category} key={`card-${index}`} />)
                }
            </div>
            <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full bg-[#F5F8F3]"></div>
        </div>
    )
}

const Card = ({ title, image, description }) => {
    return (
        <div className="flex flex-col items-start justify-center gap-6 rounded-3xl border border-[#E5F4F2] bg-white p-8 text-left shadow-lg">
            <div><Image src={`/images/${image}`} width={500} height={300} alt={title} /></div>
            <div className="text-xl font-[600]">{title}</div>
            <div className="font-[400]">{description}</div>
            <Button>Read More</Button>
        </div>
    )
}

export default Dissussions;
