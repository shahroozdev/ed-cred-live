"use client";
import React, {  useState } from "react";
import { Loader2, Send } from "lucide-react";
import { useMutate } from "@/hooks/generalHooks";
import { FormFeilds, FormTemplate } from "@/components/atoms";
import { disputeTimelineSchema } from "@/lib/schemas";
import AttachmentBtn from "./attachmentBtn";
import DynamicView from "@/components/atoms/uploadFiles/dynamicView";
import Modal from "@/components/molecules/modal";

const ChatInput = ({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess: () => void;
}) => {
  const { MutateFunc, isPending } = useMutate();
  const [preview, setPreview] = useState<any>(null);

  const handleSend = async (values: any) => {
    const body = { disputeId: id, ...values , attachment:preview};
    await MutateFunc({
      url: "/disputes/sendMessage",
      method: "POST",
      body,
      tags: "disputeDetail",
      noPopup: true,
      allowMulti: true,
      onSuccess: () => {
        onSuccess();
        setPreview(null);
      },
    });
  };

  return (
    <>
      <FormTemplate
        onSubmit={handleSend}
        schema={disputeTimelineSchema}
        defaultValues={{ message: "", attachment: undefined }}
        className="w-full border-t border-solid p-3 flex items-start gap-2 relative"
      >
        <AttachmentBtn  setPreview={setPreview}/>
        <FormFeilds fieldProps={{ name: "message", className: "w-full" }}>
          {(field) => (
            <input
              {...field}
              value={field.value}
              onChange={field.onChange}
              placeholder="Type your message..."
              className="flex-1 border border-solid rounded-full px-4 py-2 focus:outline-none"
            />
          )}
        </FormFeilds>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mt-1 cursor-pointer"
        >
          {isPending ? <Loader2 className="animate-spin" size={18}/> : <Send size={18} />}
        </button>
      </FormTemplate>
      <Modal
        trigger={<></>}
        setIsOpen={setPreview}
        onClose={() => setPreview(null)}
        open={preview !== null}
        title="Attachment"
      >
        <div className="space-y-8 flex justify-center flex-col items-center">
          <div className="w-48 h-48">
            {preview && <DynamicView file={preview} />}
          </div>
          <FormTemplate
            onSubmit={handleSend}
            schema={disputeTimelineSchema}
            defaultValues={{ message: "", attachment: undefined }}
            className="w-full border-t border-solid p-1 flex items-start gap-2 relative"
          >
            <FormFeilds fieldProps={{ name: "message", className: "w-full" }}>
              {(field) => (
                <input
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Type your message..."
                  className="flex-1 p-2 focus:outline-none"
                />
              )}
            </FormFeilds>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 mt-1 cursor-pointer"
            >
              {isPending ? <Loader2 className="animate-spin" size={18}/> : <Send size={18} />}
            </button>
          </FormTemplate>
        </div>
      </Modal>
    </>
  );
};

export default ChatInput;
