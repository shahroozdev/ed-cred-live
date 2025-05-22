"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import 'react-quill-new/dist/quill.snow.css';
import EditorSkeleton from "@/skeletons/editorSkeleton";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});

interface Props {
  value?: any;
  links?: boolean;
  image?: boolean;
  onChange?: (html: string) => void;
  className?: string;
}
const QuillEditor = ({ value, links, image, onChange, className }: Props) => {
  const [content, setContent] = useState<any>();

  const handleChange = (value: any) => {
    setContent(value);
  };

  useEffect(() => {
    if (content === "<p><br></p>") {
      setContent("");
    }
  }, [content]);
  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote","image"],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [links ? "link" : "", image ? "image" : "" /*"video"*/] /*, ["clean"]*/,
    ],
  };

  const formats = [
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "list",
    // "bullet",
    "indent",
    "image"
    // ...([links && "link"]),
    // ...([image && "image"])/*"video","clean",*/,
  ];
  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value ?? content}
        onChange={onChange ?? handleChange}
        modules={modules}
        formats={formats}
        className="!min-h-[280px] !max-h-[280px] !h-[280px] !mb-5 !min-w-full"
      />
    </div>
  );
};

export default QuillEditor;
