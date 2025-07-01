"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import QuillEditor from "../molecules/editor";
import { useMutate } from "@/hooks/generalHooks";
import { Button, FormFeilds, FormTemplate } from "../atoms";
import UploadFilePreview from "../atoms/uploadAndPreview";
import { postSchema } from "@/lib/schemas";
import { Dispatch, SetStateAction } from "react";

export default function CreatePost({
  data: defaultValues,
  setIsOpen
}: {
  data?: Record<string, any>;
  setIsOpen?:Dispatch<SetStateAction<boolean>>
}) {
  const { MutateFunc, isPending } = useMutate();

  async function onSubmit(data: any) {
    await MutateFunc({
      url: defaultValues ? `/posts/${defaultValues?.id}`:"/posts",
      tags: "posts",
      method: defaultValues ? "PUT" : "POST",
      body: {...data, status:data?.status?"active":"draft"},
      allowMulti: true,
      sendTo: "/posts",
      onSuccess:()=>setIsOpen&&setIsOpen(false)
    });
  }
  console.log(defaultValues);
  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={postSchema}
      className="space-y-8 w-full overflow-hidden px-5"
      defaultValues={{
        title: defaultValues?.title || "",
        body: defaultValues?.body || "",
        image: null,
        featured: defaultValues?.featured || false,
        status: defaultValues
          ? defaultValues?.status === "active"
            ? true
            : false
          : false,
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
          fieldProps={{ name: "body",}}
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
        <UploadFilePreview inputName={"image"} label={"Featured Image"} url={defaultValues?.image}/>
      </div>
      <Button variant="primary" loading={isPending} type="submit">
        Save Post
      </Button>
    </FormTemplate>
  );
}
