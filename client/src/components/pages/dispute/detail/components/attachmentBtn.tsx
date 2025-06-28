"use client";
import { FormFeilds } from "@/components/atoms";
import { types } from "@/data/constant";
import { Paperclip,  } from "lucide-react";
import React, { ChangeEvent,  } from "react";

const AttachmentBtn = ({
    setPreview,
}: {
  setPreview: any;
}) => {
 
  const maxSize = 5 * 1024 * 1024; // 5MB

  const attachmentSizeLimiter = (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    // if(!e.target.files) return;
    const file: any = e?.target?.files?.[0];
    const totalSize = file.size;
    if (totalSize > maxSize) {
      alert("Total file size exceeds 5MB limit.");
      e.target.value = ""; // Reset the file input
      return;
    } else {
      setPreview(file);
      field.onChange(file);
      e.target.value = ""; // Reset so reselecting same file works
    }
  };

  return (
    <>
      <FormFeilds
        fieldProps={{
          name: "attachment",
          className: "y-8 space-y-2",
        }}
        label={{
          text: <Paperclip size={20} />,
          className: "p-2 text-gray-600 hover:text-blue-600 cursor-pointer",
        }}
      >
        {(field) => (
          <input
            type="file"
            accept={types["all"]}
            // {...field}
            onChange={(e) => {
              attachmentSizeLimiter(e, field);
            }}
            style={{ display: "none" }}
          />
        )}
      </FormFeilds>
    </>
  );
};

export default AttachmentBtn;
