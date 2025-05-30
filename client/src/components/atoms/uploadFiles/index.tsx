import React, { ChangeEvent, useState } from "react";
import { FormFeilds } from "../form";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const UploadFiles = ({ inputName }: { inputName?: string }) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const {setValue} = useFormContext();
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
      alert("Total file size exceeds 5MB limit.");
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
    setValue(inputName||'attachments', updatedFiles);
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
            accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.pdf,.doc,.docx"
            // {...field}
            onChange={(e) => {
              attachmentSizeLimiter(e, field);
            }}
            style={{ display: "none" }}
          />
        )}
      </FormFeilds>

      {/* Attachments Preview */}
      <div className="mt-2 space-y-1 text-sm flex flex-wrap gap-2">
        {attachments.map((item: any, index) => (
          <div
            key={index}
            className="flex items-center justify-between h-[30px] max-w-36 border-[1px] shadow-2xl border-foreground px-3 py-1 rounded"
          >
            <span className="truncate">{item?.name}</span>
            <button
              type="button"
              className="text-red-500 ml-2 cursor-pointer"
              onClick={() => removeAttachment(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadFiles;
