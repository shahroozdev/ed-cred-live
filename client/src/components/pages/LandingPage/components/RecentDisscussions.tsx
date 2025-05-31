import HTMLContent from "@/components/atoms/htmlContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ title, featureImageUrl, text, id }: any) => {
  console.log(process.env.BASE_URL + featureImageUrl);
  return (
    <div className="flex flex-col items-start h-[500px] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out justify-start gap-6 rounded-3xl border border-[#E5F4F2] bg-background p-2 text-left shadow-lg">
      <div className="w-full min-h-[200px] h-[200px] max-h-[200px]">
        <Image
          src={process.env.BASE_URL + featureImageUrl}
          width={500}
          height={200}
          alt={title}
          className="w-full h-full rounded-3xl"
        />
      </div>
      <div className="text-xl font-[600] line-clamp-2 min-h-[55px] px-2">
        {title}
      </div>
      <HTMLContent value={text} className="line-clamp-5 !px-2 !py-0 !overflow-y-hidden" />
      <Link
        href={`/forum/questions/${id}`}
        className="group flex gap-2 px-2 py-2 rounded-md transition-all duration-300 ease-in-out bg-[#439e5e] border-[1px] border-[#439e5e] hover:bg-background hover:text-[#439e5e]  text-white"
      >
        Read More <ArrowRight className="-rotate-45 group-hover:rotate-0" />
      </Link>
    </div>
  );
};

const Discussions = ({ data }: { data: Record<string, any> }) => {
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
        {data?.forums?.map((card: Record<string, any>, index: number) => (
          <Card {...card} key={`card-${index}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 -z-10 h-1/2 w-full bg-[#F5F8F3]"></div>
    </div>
  );
};

export default Discussions;
