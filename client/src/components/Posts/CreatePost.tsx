"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { savePost } from "@/api/posts";
import { toast } from "sonner";
// import UnlayerEditor from "./UnlayerEditor";
import QuillEditor from "../molecules/editor";
import { useMutate } from "@/hooks/generalHooks";
import { Button } from "../atoms";

const PostFormSchema = z.object({
  title: z.string().min(2, "Please enter alteast 2 characters"),
  description: z
    .string()
    .min(10, "Please make sure to write atleast 10 characters"),
  featured: z.boolean().default(false),
  live: z.boolean().default(false),
  body: z.any().optional(),
});

type PostFormValues = z.infer<typeof PostFormSchema>;

export default function CreatePost() {
  const form = useForm({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {},
  });
  const { MutateFunc, isPending } = useMutate();

  async function onSubmit(data: PostFormValues) {
    await MutateFunc({
      url: "/posts",
      tags: "posts",
      method: "POST",
      body: {
        title: data.title,
        description: data.description,
        status: data.live ? "active" : "draft",
        featured: data.featured,
        image: null,
        body: data.body,
      },
      sendTo:"/posts"
    });
    // const saved = await savePost({
    //   title: data.title,
    //   description: data.description,
    //   status: data.live ? "active" : "draft",
    //   featured: data.featured,
    //   image: null,
    //   body: data.body,
    // });
    // console.log(saved);

    // if (saved) {
    //   toast("Post saved successfully!");
    //   form.reset();
    // }
  }

  return (
    // <div className="flex gap-8 mb-8">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full overflow-hidden px-5"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Post Title</FormLabel>
                </div>
                <FormControl>
                  <Input {...field} type="text" className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Post Description</FormLabel>
                </div>
                <FormControl>
                  <Textarea {...field} className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Post</FormLabel>
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
              <FormItem className="flex w-full flex-row items-center justify-between rounded-lg border p-4">
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
              <FormItem className="w-full">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Post Body</FormLabel>
                </div>
                <FormControl>
                  {/* @ts-ignore */}
                  <QuillEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full mb-10"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant="primary" loading={isPending} type="submit">Save Post</Button>
      </form>
    </Form>
    // </div>
  );
}
