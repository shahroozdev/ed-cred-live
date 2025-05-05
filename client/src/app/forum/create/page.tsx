"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProfile } from "@/api/auth";
import { API_BASE_URL } from "@/api/config";
import { useRouter } from "next/navigation";
import { Title } from "@/components/Common/Title";

export default function CreateForumQuestionPage() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const sumbitQuestion = async () => {
        // TODO: this must be factored out to a store.
        // We should not ping the server again and again
        // to get the users profile.
        const user = await getProfile();
        const response = await fetch(`${API_BASE_URL}/forum-question/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title: title,
                text: text,
                authorId: user.id,
            })
        });

        if (!response.ok) {
            toast.error("Something went wrong!");
            return;
        }
        return await response.json();
    }

    const handleSubmit = async () => {
        // TODO:
        // `onSumbit` we must prompt the user to confirm the question.
        // We must also notify him that the question will be posted 
        // under his account name.

        if (title && text) {
            const response = await sumbitQuestion();
            if (response) {
                console.log(response);
                setTitle("");
                setText("");
                toast("Question Added successfully!");
            }
        }
    };
    const router = useRouter();

    return (
        <div className="bg-background text-foreground mx-auto h-full space-y-6">
            <div className="outline-muted _outline-2 mx-auto my-auto mt-10 flex h-full max-w-2xl flex-col gap-2 rounded-md p-4">
                <Title
                    title="Ask a Question"
                    desc="Note that the questions you ask will be publically visible under your name! Kindly Don't ask irrelevant or inappropriate questions." 
                />
                <input
                    placeholder="question title"
                    className="outline-muted focus:bg-muted focus:outline-muted-foreground rounded-md px-3 py-2 text-base outline-2"
                    value={title}
                    required
                    minLength={2}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="outline-muted focus:bg-muted focus:outline-muted-foreground h-28 rounded-md px-3 py-2 text-base outline-2"
                    placeholder="details about your question..."
                    value={text}
                    required
                    minLength={5}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-2 self-end">
                    <Button onClick={handleSubmit}>
                        Post Question
                    </Button>
                </div>
            </div>
        </div>
    );
}
