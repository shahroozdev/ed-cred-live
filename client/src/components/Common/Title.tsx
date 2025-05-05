import { useRouter } from "next/navigation";

export const Title = ({ title, desc }: {title: string; desc: string}) => {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.back()} className="text-left text-blue-500 hover:underline mb-4">
                ← Back to Dashboard
            </button>
            <div className="text-3xl font-semibold">{title}</div>
            <div className="font-base text-muted-foreground mb-8">{desc}</div>
        </div>
    )
}
