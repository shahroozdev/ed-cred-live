"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import UploadFilePreview from "@/components/atoms/uploadAndPreview";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutate } from "@/hooks/generalHooks";
import { ForumSchema } from "@/lib/schemas";
import { PlusIcon } from "lucide-react";

const CreateForum = () => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async(values: any) => {
    await MutateFunc({url:'/forum-question', method:'POST', body:values, sendTo:'/forum', allowMulti:true})
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      schema={ForumSchema}
      defaultValues={{ title: "", text: "", featuredImage: undefined }}
      className="space-y-2"
    >
      <FormFeilds fieldProps={{ name: "title" }} label={{ text: "Title" }}>
        {(field) => <Input {...field} onChange={field.onChange} />}
      </FormFeilds>
      <FormFeilds fieldProps={{ name: "text" }} label={{ text: "Question" }}>
        {(field) => <Textarea {...field} onChange={field.onChange} />}
      </FormFeilds>
      <UploadFilePreview inputName={"featuredImage"} label={"Featured Image"}/>
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
