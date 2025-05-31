"use client";
import { useEffect, useState } from "react";

const HTMLContent = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    setHtml(value);
  }, [value]);

  if (!html) return null;
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };
  return (
    <p
      dangerouslySetInnerHTML={{ __html: html }}
      className={`view ql-editor ${className}`}
      title={stripHtml(value)}
    />
  );
};

export default HTMLContent;
