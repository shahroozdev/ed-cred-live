"use client";
import { API_BASE_URL } from "@/api/config";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { MessageSquareMoreIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Question {
    id:        number;
    title:     string;
    text:      string;
    author:    { username: string; };
    createdAt: Date;
}

export const RecentQuestions = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const fetchQuestions = async () => {
        const response = await fetch(`${API_BASE_URL}/forum-question/`);
        const body = await response.json();
        console.log(body);
        setQuestions(body);
    }

    useEffect(() => {
        fetchQuestions();
    }, []);

    const router = useRouter();

    return(
        <div className="outline-muted _outline-2 mx-auto my-auto mt-10 flex h-full max-w-2xl flex-col gap-2 rounded-md p-4 mb-10">
            <div className="mt-2 text-3xl font-semibold">Recent Questions</div>
            <p className="text-muted-foreground text-base">These are some of the recent questions asked by people. Have a look! Remember to be polite and nice.</p>
            <div className="mt-4 flex flex-col gap-4">
                {
                    questions.length > 0 && questions.map((question) => (
                        <div 
                            key={question.id}
                            className="outline-muted hover:bg-muted flex cursor-pointer flex-col rounded-md p-4 outline-2 transition-colors"
                            onClick={() => router.push(`forum/questions/${question.id}`)}
                        >
                            <div className="text-lg">{question.title}</div>
                            <div className="text-muted-foreground line-clamp-2 text-ellipsis text-base">{question.text}</div>
                            <Separator className="my-2"/>
                            <div className="flex w-full justify-between">
                                <div className="text-muted-foreground line-clamp-1 text-base">
                                    asked by <span className="font-semibold">{question.author.username}</span> on <span className="font-semibold lowercase">
                                        {new Intl.DateTimeFormat("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }).format(new Date(question.createdAt ?? ""))
                                        }
                                    </span>
                                </div>
                                <div className="flex gap-2 self-end">
                                    <ThumbsDownIcon strokeWidth={1} className="hover:text-red-500"/>
                                    <MessageSquareMoreIcon strokeWidth={1} />
                                    <ThumbsUpIcon strokeWidth={1} className="hover:text-blue-500" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
