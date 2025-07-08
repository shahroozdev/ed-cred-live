"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import Select3 from "@/components/atoms/select/select3";
import QuillEditor from "@/components/molecules/editor";
import { Input } from "@/components/ui/input";
import { documentTypes } from "@/data/constant";
import React from "react";

const CreateEditDocument = () => {
  const onSubmit = async (values: any) => {
    console.log(values);
  };
  return (
    <FormTemplate onSubmit={onSubmit} className="space-y-4">
      <FormFeilds fieldProps={{ name: "name" }} label={{ text: "Title" }}>
        {(field) => <Input {...field} placeholder="Document Title" />}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "category" }}
        label={{ text: "Category" }}
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
      <Button type="submit" variant="primary" className="ml-auto mr-0 mt-10">Create</Button>
    </FormTemplate>
  );
};

export default CreateEditDocument;
