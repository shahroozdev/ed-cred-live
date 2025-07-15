"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import UploadFilePreview from "@/components/atoms/uploadAndPreview";
import QuillEditor from "@/components/molecules/editor";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/generalHooks";
import { ForumEditSchema, ForumSchema } from "@/lib/schemas";
import { Dispatch, SetStateAction } from "react";

const CreateForum = ({
  data,
  setIsOpen,
}: {
  data?: Record<string, any>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (values: any) => {
    await MutateFunc({
      url: "/forum-question",
      method: "POST",
      body: { ...values, ...(data?.id ? { id: data?.id } : {}) },
      tags: "forumList",
      sendTo: "/forum",
      allowMulti: true,
      onSuccess: () => setIsOpen && setIsOpen(false),
    });
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={data?.id ?ForumEditSchema:ForumSchema}
      defaultValues={{
        title: data?.title || "",
        text: data?.text || "",
        featuredImage: undefined,
      }}
      className="space-y-2"
    >
      <FormFeilds fieldProps={{ name: "title" }} label={{ text: "Title" }}>
        {(field) => <Input {...field} onChange={field.onChange} />}
      </FormFeilds>
      <FormFeilds fieldProps={{ name: "text" }} label={{ text: "Question" }}>
        {(field) => (
          <QuillEditor
            value={field.value}
            onChange={field.onChange}
            className="w-full mb-10"
          />
        )}
      </FormFeilds>
      <UploadFilePreview
        inputName={"featuredImage"}
        label={"Featured Image"}
        url={data?.featureImageUrl}
      />
      <Button
        // icon={<PlusIcon />}
        variant={"primary"}
        type="submit"
        loading={isPending}
      >
        Submit Forum
      </Button>
    </FormTemplate>
  );
};

export default CreateForum;
