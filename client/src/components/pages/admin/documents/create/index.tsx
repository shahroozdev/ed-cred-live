"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import Select3 from "@/components/atoms/select/select3";
import QuillEditor from "@/components/molecules/editor";
import { Input } from "@/components/ui/input";
import { documentTypes } from "@/data/constant";
import { useMutate } from "@/hooks/generalHooks";
import React from "react";

const CreateEditDocument = ({defaultValues}:{defaultValues?:Record<string, any>}) => {

  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (values: any) => {
    await MutateFunc({ url: defaultValues?.id?`/documents/${defaultValues?.id}`:"/documents", method: defaultValues?.id?"PATCH":"POST", body: values });
    console.log(values);
  };
  return (
    <FormTemplate onSubmit={onSubmit} className="space-y-4" defaultValues={{name:defaultValues?.name, type:defaultValues?.type, desc:defaultValues?.desc}}>
      <FormFeilds fieldProps={{ name: "name" }} label={{ text: "Title" }}>
        {(field) => <Input {...field} value={field.value} onChange={field.onChange} placeholder="Document Title" />}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "type" }}   
        label={{ text: "Document Type" }}
      >
        {(field) => (
          <Select3
            value={field.value}
            onValueChange={field.onChange}
            options={documentTypes}
            placeholder="Select Type"
          />
        )}
      </FormFeilds>
      <FormFeilds fieldProps={{ name: "desc" }} label={{ text: "Description" }}>
        {(field) => <QuillEditor {...field} />}
      </FormFeilds>
      <Button
        type="submit"
        variant="primary"
        className="ml-auto mr-0 mt-10"
        loading={isPending}
      >
        Create
      </Button>
    </FormTemplate>
  );
};

export default CreateEditDocument;
