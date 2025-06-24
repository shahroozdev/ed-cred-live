"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { FormFeilds } from "../form";

const UploadFilePreview = ({ inputName, label , allowTypes}: { inputName: string, label?:string, allowTypes?:string }) => {
  const [preview, setPreview] = useState<any>(null);
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
      const blob = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);
      setPreview(blobUrl);
      field.onChange(file);
      e.target.value = ""; // Reset so reselecting same file works
    }
  };
  return (
    <>
    {label&&<p>{label}</p>}
      <FormFeilds
        fieldProps={{
          name: inputName,
          className: "y-8 space-y-2",
        }}
        label={{
          text: (
            <Image
              width={1000}
              height={500}
              alt=""
              src={preview ? preview : "/icons/upload-icon.svg"}
              className="w-full h-full object-contain"
            />
          ),
          className:
            "flex flex-col items-center h-[200px] justify-center gap-1 border rounded-xl border-dashed p-5 cursor-pointer",
        }}
      >
        {(field) => (
          <input
            type="file"
            multiple
            accept={allowTypes||".jpg,.jpeg,.png,.gif"}
            // {...field}
            onChange={(e) => {
              attachmentSizeLimiter(e, field);
            }}
            style={{ display: "none" }}
          />
        )}
      </FormFeilds>
      <p className="text-[8px] text-thin opacity-70">(Maximum size limit: 5mb)</p>
    </>
  );
};

export default UploadFilePreview;
