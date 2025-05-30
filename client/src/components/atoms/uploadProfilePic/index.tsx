"use client";
import React, { ReactNode } from "react";
import FormTemplate, { FormFeilds } from "../form";
import { useMutate } from "@/hooks/generalHooks";
import { imageSchema } from "@/lib/schemas";
import { Pencil } from "lucide-react";

const UploadProfilePic = ({ children }: { children: ReactNode }) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (values: any, field: any) => {
    if (values) {
      field.onChange(values);
      await MutateFunc({
        url: "/auth/profile",
        method: "PUT",
        body: { file: values },
        allowMulti:true,
        tags: "profile",
      });
    }
  };
  return (
    <FormTemplate
      onSubmit={() => {}}
      defaultValues={{ file: "" }}
      schema={imageSchema}
      className="relative w-40 h-40 min-w-18 min-h-18 "
    >
      <FormFeilds
        fieldProps={{ name: "file" }}
        label={{
          text: (
            <div className="w-10 h-10 rounded-full flex justify-center items-center absolute right-2 top-0 bg-green-400 cursor-pointer">
              <Pencil size={20} />
            </div>
          ),
        }}
      >
        {(field) => (
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              onSubmit(file, field);
            }}
          />
        )}
      </FormFeilds>
      {children}
    </FormTemplate>
  );
};

export default UploadProfilePic;
