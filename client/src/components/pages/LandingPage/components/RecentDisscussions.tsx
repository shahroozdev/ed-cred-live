import HTMLContent from "@/components/atoms/htmlContent";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import PLink from "@/components/atoms/link";

const Card = ({ title, featureImageUrl, text, id }: any) => {

  return (
    <div className="flex flex-col items-start sm:h-[500px] h-[600px] overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out justify-start gap-6 rounded-3xl border border-muted border-solid bg-background p-2 text-left shadow-lg shadow-[#b6b6b6]" >
      <div className="w-full sm:min-h-[200px] sm:h-[200px] sm:max-h-[200px] min-h-[300px] h-[300px] max-h-[300px] border rounded-3xl border-solid">
        <Image
          src={process.env.BASE_URL + featureImageUrl}
          width={1000}
          height={1000}
          alt={title}
          className="w-full h-full object-cover object-center rounded-3xl"
        />
      </div>
      <div className="text-xl font-[600] line-clamp-2 min-h-[55px] px-2">
        {title}
      </div>
      <HTMLContent value={text} className="line-clamp-4 !px-2 !py-0 !overflow-y-hidden" />
      <PLink
        href={`/forum/questions/${id}`}
        className="group flex gap-2 ml-2 px-2 py-2 rounded-md transition-all duration-300 ease-in-out bg-[#439e5e] border-[1px] border-[#439e5e] border-solid hover:bg-background hover:text-[#439e5e]  text-white"
      >
        Read More <ArrowRight className="-rotate-45 group-hover:rotate-0" />
      </PLink>
    </div>
  );
};

const Discussions = ({ data }: { data: Record<string, any> }) => {
  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center gap-14 mb-20 max-w-[1200px] m-auto">
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
