import Image from "next/image";
import { Button } from "../atoms";


const Card = ({ title, image, description }) => {
    return (
        <div className="flex flex-col items-start justify-center gap-6 rounded-3xl border border-[#E5F4F2] bg-background p-8 text-left shadow-lg">
            <div><Image src={`/images/${image}`} width={500} height={300} alt={title} /></div>
            <div className="text-xl font-[600]">{title}</div>
            <div className="font-[400]">{description}</div>
            <Button>Read More</Button>
        </div>
    )
}

const Discussions = () => {
  const DiscussionCards = [
    {
      title: "Excepteur sint occaecat cupidatat non proident",
      image: "1.png",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
    },
    {
      title: "Excepteur sint occaecat cupidatat non proident",
      image: "2.png",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
    },
    {
      title: "Excepteur sint occaecat cupidatat non proident",
      image: "3.png",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
    },
  ];

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center gap-14 py-20 md:py-40 max-w-[1200px] m-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-max rounded-full bg-[#A1AF001A] px-4 py-2 font-sans text-sm font-[400] tracking-widest text-[#439E5E] md:text-base">
          LATEST INSIGHTS
        </div>
        <div className="text-3xl font-[400]">
          Recent <span className="font-bold">Discussion</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 items-center justify-center gap-8 md:px-10 px-4 ">
        {DiscussionCards.map((card, index) => (
          <Card {...card} key={`card-${index}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full bg-[#F5F8F3]"></div>
    </div>
  );
}

export default Discussions;