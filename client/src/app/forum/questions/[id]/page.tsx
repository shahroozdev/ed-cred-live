"use client";
import { API_BASE_URL } from "@/api/config";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProfile } from "@/api/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Reply {
    id: number;
    text: string;
    author: { username: string; };
    createdAt: Date;
}

interface Question {
    id:        number;
    title:     string;
    text:      string;
    author:    { username: string; };
    replies:   Reply[];
    createdAt: Date;
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState<string>("");

    const router = useRouter();
    const getQuestion = async() => {
        const response = await fetch(`${API_BASE_URL}/forum-question/${id}`);
        const body = await response.json();
        if (!response.ok) { 
            router.push("/not-found");
            return;
        }
        setQuestion(body);
    }

    useEffect(() => {
        getQuestion();
    }, [id]);

    const reply = async () => {
        if (answer === "") return;
        const user = await getProfile();
        const response = await fetch(`${API_BASE_URL}/forum-reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: answer,
                questionId: question?.id,
                authorId: user.id,
            })
        });

        const body = await response.json();
        if (!response.ok) {
            toast("Something went wrong", body.message);
            return;
        }

        toast("Reply sumbitted!", body.message);
        getQuestion();
        setAnswer("");
    }

    return(
        <div className="w-full bg-background text-foreground">
            <div className="max-w-2xl mx-auto mt-10">
                <button onClick={() => router.back()} className="text-blue-500 hover:underline w-full text-left mb-2">
                    ← Back to Dashboard
                </button>
                <div className="font-semibold text-3xl">
                    {question?.title}
                </div>
                <div className="mt-2">{question?.text}</div>
                <Separator className="my-4"/>
                <div className="flex w-full justify-between">
                    <div className="text-muted-foreground line-clamp-1 text-base">
                        asked by <span className="font-semibold">{question?.author.username}</span> on <span className="font-semibold lowercase">
                            {new Intl.DateTimeFormat("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }).format(new Date(question?.createdAt ?? new Date()))
                            }
                        </span>
                    </div>
                    <div className="flex gap-2 self-end">
                        <ThumbsDownIcon strokeWidth={1} className="hover:text-red-500"/>
                        <ThumbsUpIcon strokeWidth={1} className="hover:text-blue-500" />
                    </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    {
                        question?.replies.map((reply) => (<div className="flex flex-col gap-0 p-4 outline outline-muted rounded-md" key={reply.id}>
                            <div className="flex gap-4 items-center">
                                <Avatar className="self-start">
                                    <AvatarFallback>{reply.author.username.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                {reply.text}
                            </div>
                            <span className="font-semibold lowercase text-muted-foreground text-sm self-end">
                                {new Intl.DateTimeFormat("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }).format(new Date(reply.createdAt ?? new Date()))
                                }
                            </span>
                        </div>))
                    }
                </div>

                <div className="flex flex-col mt-20 gap-2">
                    <textarea
                        className="outline-muted focus:bg-muted focus:outline-muted-foreground h-28 rounded-md px-3 py-2 text-base outline-2"
                        placeholder="answer the question"
                        required
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        minLength={5}
                    />
                    <div className="self-end" onClick={reply}>
                        <Button disabled={answer === ""}>answer</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
