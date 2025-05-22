import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppleIcon, ExternalLinkIcon } from "lucide-react";
import { v4 } from "uuid";

export const ReviewCard = ({ response, hideRating=false } : { response: any, hideRating?: boolean}) => {
    const router = useRouter();

    return (
        <div className="w-full border-2 border-muted rounded-md px-3 py-2 flex flex-col gap-2 shadow-lg hover:shadow-xl" onClick={
            () => router.push(`/response/${response.id}`)
        }>
            <div className="flex gap-4">
                <Image
                    src={`/uploads/categoryIcons/${response.feedbackForm.category.name.toLowerCase()}.png`}
                    width={200} height={200} alt={''} className="w-12 h-auto object-contain" />
                {response.details?.pricipalName ?
                    <div className="flex flex-col leading-snug gap-0">
                        <div className="text-lg font-semibold">Principal {response.details.pricipalName}</div>
                        <div className="text-base font-normal">{response.details.schoolName} {response.details.schoolCountry}</div>
                    </div> : 
                    response.details?.directorName ?
                        <div className="flex flex-col">
                            <div className="text-lg font-semibold">Pricipal {response.details.directorName}</div>
                            <div className="text-lg font-semibold">{response.details.schoolName}</div>
                        </div> : 
                        <div className="text-lg font-semibold">
                            <div className="">{response.details.schoolName}</div>
                            <div className="text-base">{response.details.schoolCountry}</div>
                        </div>
                }
            </div>
            {
                !hideRating && <RatingBar rating={response.rating} />
            }
            <div className="text-ellipsis line-clamp-1 italic">{response.comments}</div>
            <a className="text-base text-muted-foreground font-normal flex gap-2 items-center mt-auto" href={`https://www.${response.details.schoolWebsite}`}>
                {response.details.schoolWebsite}
                <ExternalLinkIcon stroke="gray" size={16} />
            </a>
            {
                !hideRating && <div>{response.totalReviews} reviews</div>
            }
        </div>
    )
}

const RatingBar = ({ rating } : { rating: number }) => {
    return (
        <div className="flex gap-1 items-center justify-start">
            {
                Array.from({length: 10}).map((_, i) => <AppleIcon key={v4()} size={16} fill={i + 1 < rating ? "red" : "gray"} stroke={i + 1 < rating ? "red" : "gray"} />)
            }
            <div className="text-base ml-2">{ rating.toFixed(0) }/10</div>
        </div>
    )
}
