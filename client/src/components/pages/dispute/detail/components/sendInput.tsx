"use client";
import React, { useRef, useState } from "react";
import { Paperclip, Send } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    if (!message && !file) return;
    // onSend(message.trim(), file || undefined);
    setMessage("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="w-full border-t p-3 flex items-center gap-2 absolute bottom-0 left- right-0 ">
      {/* <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) setFile(e.target.files[0]);
        }}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="p-2 text-gray-600 hover:text-blue-600"
      >
        <Paperclip size={20} />
      </button> */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
