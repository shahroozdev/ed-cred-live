"use client";
import { XIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation";

export const AskQuestionCard = () => {
    const [close, setClose] = useState(false);
    const router = useRouter();

    return(
        <div 
            style={{ display: close ? "none" : "flex" }}
            className="outline-2 outline-primary p-4 rounded-md max-w-2xl flex flex-col mx-auto mt-10 relative"
        >
            <XIcon className="absolute right-4 top-4" onClick={() => setClose(true)} />
            <div className="text-3xl font-semibold mt-4">Want to ask a question?</div>
            <p className="text-muted-foreground text-base my-1 mb-4">Have a burning question? Get expert insights and community support by asking your question now. Start the conversation and get the answers you need!</p>
            <div className="self-end">
                <Button
                    onClick={() => {
                        router.push("/forum/create");
                    }}
                >
                    Ask now</Button>
            </div>
        </div>
    )
}
