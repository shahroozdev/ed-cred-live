import React, { ChangeEvent, useState } from "react";
import { FormFeilds } from "../form";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import DynamicView from "./dynamicView";
import { toast } from "sonner";

const UploadFiles = ({ inputName, urls }: { inputName?: string, urls?:string[] }) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const { setValue } = useFormContext();
  const maxSize = 5 * 1024 * 1024; // 5MB
  const attachmentSizeLimiter = (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    // if(!e.target.files) return;
    const files: any = Array.from(e?.target?.files || []);
    const totalSize = [...files, ...attachments]?.reduce(
      (acc: any, file: any) => acc + file.size,
      0
    );
    if (totalSize > maxSize) {
      toast.error("Total file size exceeds 5MB limit.");
      e.target.value = ""; // Reset the file input
      return;
    } else {
      const newFiles = [...attachments, ...files];
      setAttachments(newFiles);
      field.onChange(newFiles);
      e.target.value = ""; // Reset so reselecting same file works
    }
  };

  const removeAttachment = (index: number) => {
    const updatedFiles = [...attachments];
    updatedFiles.splice(index, 1);
    setAttachments(updatedFiles);
    setValue(inputName || "attachments", updatedFiles);
  };
  return (
    <>
      <p>Upload Attachment</p>
      <FormFeilds
        fieldProps={{
          name: inputName || `attachments`,
          className: "y-8 space-y-2",
        }}
        label={{
          text: (
            <Image
              width={60}
              height={50}
              alt=""
              src={"/icons/upload-icon.svg"}
            />
          ),
          className:
            "flex flex-col items-center justify-center gap-1 border rounded-xl border-dashed p-5 cursor-pointer",
        }}
      >
        {(field) => (
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.pdf,.doc,.docx,.mp3"
            // {...field}
            onChange={(e) => {
              attachmentSizeLimiter(e, field);
            }}
            style={{ display: "none" }}
          />
        )}
      </FormFeilds>

      {/* Attachments Preview */}
      <div className="my-4 space-y-4 text-sm grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {attachments.map((file: any, index) => {
          return (
            <div
              key={index}
              className="relative flex items-start justify-start max-h-48 border-foreground border-solid py-1 rounded"
            >
             <DynamicView file={file}/>
              <span
                className="text-white ml-2 cursor-pointer absolute z-1 -top-[2px] -right-1 w-4 h-4 rounded-full flex justify-center items-center bg-red-500"
                onClick={() => removeAttachment(index)}
              >
                ×
              </span>
            </div>
          );
        })}
        {urls?.map((file: any, index) => {
          return (
            <div
              key={index}
              className="relative flex items-start justify-start max-h-48 border-foreground border-solid py-1 rounded"
            >
             <DynamicView url={file}/>
              {/* <span
                className="text-white ml-2 cursor-pointer absolute z-1 -top-[2px] -right-1 w-4 h-4 rounded-full flex justify-center items-center bg-red-500"
                onClick={() => removeAttachment(index)}
              >
                ×
              </span> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UploadFiles;
