"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MinimalTiptapEditor } from "../minimal-tiptap";
import { TooltipProvider } from "../ui/tooltip";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { savePost } from "@/api/posts";
import { toast } from "sonner";
import UnlayerEditor from "./UnlayerEditor";

const PostFormSchema = z.object({
    title: z.string().min(2, "Please enter alteast 2 characters"),
    description: z.string().min(10, "Please make sure to write atleast 10 characters"),
    featured: z.boolean().default(false),
    live: z.boolean().default(false),
    body: z.any().optional(),
});

type PostFormValues = z.infer<typeof PostFormSchema>

export default function CreatePost() {
    const form = useForm({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {}
    });

    async function onSubmit(data: PostFormValues) {
        const saved = await savePost({
            title: data.title,
            description: data.description,
            status: data.live ? "active" : "draft",
            featured: data.featured,
            image: null,
            body: data.body,
        });
        console.log(saved);

        if (saved) {
            toast("Post saved successfully!");
            form.reset();
        }
    }

    return (
        <div className="flex gap-8 mb-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Post Title
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input {...field} type="text" className="w-2xl"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Post Description
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Textarea {...field} className="w-2xl"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="featured"
                                render={({ field }) => (
                                    <FormItem className="flex max-w-2xl flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Featured Post
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="live"
                                render={({ field }) => (
                                    <FormItem className="flex max-w-2xl flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Make Post Live</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem className="items-center justify-between rounded-lg">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Post Body
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            {/* @ts-ignore */}
                                            <UnlayerEditor
                                                value={field.value}
                                                onChange={field.onChange}
                                                className="h-auto w-4xl"
                                            />
                                            {/* <TooltipProvider> */}
                                            {/*     <MinimalTiptapEditor */}
                                            {/*         value={field.value} */}
                                            {/*         onChange={field.onChange} */}
                                            {/*         //onChange={(e: Content) => setPost(post => ({...post, body: e}))} */}
                                            {/*         className="w-2xl" */}
                                            {/*         editorContentClassName="p-5" */}
                                            {/*         output="html" */}
                                            {/*         placeholder="Write your post here..." */}
                                            {/*         autofocus={true} */}
                                            {/*         editable={true} */}
                                            {/*         editorClassName="focus:outline-none" */}
                                            {/*     /> */}
                                            {/* </TooltipProvider> */}
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit">Save Post</Button>
                </form>
            </Form>
            {/*
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Post Preview</CardTitle>
                </CardHeader>
                <CardContent dangerouslySetInnerHTML={{ __html: form.watch("body") }}>
                </CardContent>
            </Card>
 */}
        </div>
    );
}


