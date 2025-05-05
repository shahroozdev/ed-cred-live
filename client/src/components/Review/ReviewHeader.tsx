import { cn } from "@/lib/utils";

interface ReviewHeaderProps {
    title: string;
    desc: string;
} 

export const ReviewHeader = (props: ReviewHeaderProps) => {
    return(
        <div className={cn("w-full bg-[#F5F8F3] dark:bg-neutral-800 py-10 text-center",
                            "flex flex-col gap-4 items-center justify-center")}>
            <div className="text-4xl font-semibold capitalize">{props.title}</div>
            <div className="max-w-xl text-base font-normal text-muted-foreground">{props.desc}</div>
        </div>
    )
}
