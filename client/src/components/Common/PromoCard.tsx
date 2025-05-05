"use client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const PromoCard = ({ title, desc, cta }: { title: string; desc: string; cta: string; }) => {
    const [close, setClose] = useState(false);
    const router = useRouter();

    return(
        <div 
            style={{ display: close ? "none" : "flex" }}
            className="outline-primary relative my-6 flex w-full flex-col rounded-md p-4 outline-2"
        >
            <XIcon className="absolute right-4 top-4" onClick={() => setClose(true)} />
            <div className="mt-4 text-3xl font-semibold">{title}</div>
            <p className="text-muted-foreground my-1 mb-4 text-base">{desc}</p>
            <div className="self-end">
                <Button
                    onClick={() => {
                        router.push("/forum/create");
                    }}
                >
                    {cta}
                </Button>
            </div>
        </div>
    )
}
