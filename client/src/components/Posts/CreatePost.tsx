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
import { Button, FormFeilds, FormTemplate } from "../atoms";
import UploadFilePreview from "../atoms/uploadAndPreview";
import { postSchema } from "@/lib/schemas";

export default function CreatePost() {

  const { MutateFunc, isPending } = useMutate();

  async function onSubmit(data: any) {
    await MutateFunc({
      url: "/posts",
      tags: "posts",
      method: "POST",
      body:data,
      allowMulti:true,
      sendTo: "/posts",
    });
  }

  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={postSchema}
      className="space-y-8 w-full overflow-hidden px-5"
      defaultValues={{
        title: "",
        descripion: "",
        body: "",
        image: null,
        featured: false,
        status: false,
      }}
    >
      <div className="space-y-4">
        <FormFeilds
          fieldProps={{ name: "title" }}
          label={{ text: "Post Title", className: "space-y-0.5" }}
        >
          {(field) => (
            <Input
              {...field}
              type="text"
              className="w-full"
              onChange={field.onChange}
            />
          )}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "description" }}
          label={{ text: "Post Description", className: "space-y-0.5" }}
        >
          {(field) => (
            <Textarea {...field} className="w-full" onChange={field.onChange} />
          )}
        </FormFeilds>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{
              name: "featured",
              className:
                "flex w-full flex-row items-center justify-between rounded-lg border p-4",
            }}
            label={{ text: "Featured Post", className: "space-y-0.5" }}
          >
            {(field) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          </FormFeilds>
          <FormFeilds
            fieldProps={{
              name: "status",
              className:
                "flex w-full flex-row items-center justify-between rounded-lg border p-4",
            }}
            label={{ text: "Make Post Live", className: "space-y-0.5" }}
          >
            {(field) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          </FormFeilds>
        </div>
        <FormFeilds
          fieldProps={{ name: "body", className: "w-full" }}
          label={{ text: "Post Body" }}
        >
          {(field) => (
            <QuillEditor
              value={field.value}
              onChange={field.onChange}
              className="w-full mb-10"
            />
          )}
        </FormFeilds>
        <UploadFilePreview inputName={"image"} label={"Featured Image"} />
      </div>
      <Button variant="primary" loading={isPending} type="submit">
        Save Post
      </Button>
    </FormTemplate>
  );
}
