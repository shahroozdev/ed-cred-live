"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  Ref,
} from "react";
import type { EmailEditorRef } from "react-email-editor";

// Dynamically import to avoid SSR issues
const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
});

// Props for the component
interface UnlayerEditorProps {
  value?: string; // JSON design string (optional)
  onChange?: (html: string) => void; // triggered when content updates
  className?: string;
}

// Methods exposed via ref
export interface UnlayerEditorHandle {
  exportHtml: () => Promise<string>;
  exportDesign: () => Promise<string>;
}

const UnlayerEditor = forwardRef(
  (
    { value, onChange, className }: UnlayerEditorProps,
    ref: Ref<UnlayerEditorHandle>
  ) => {
    const editorRef = useRef<EmailEditorRef>(null);

    // Load initial design
    useEffect(() => {
      if (editorRef.current && value) {
        try {
          const json = JSON.parse(value);
          editorRef.current.editor?.loadDesign(json);
        } catch (e) {
          console.warn("Invalid design JSON", e);
        }
      }
    }, [value]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      exportHtml: () => {
        return new Promise((resolve) => {
          editorRef.current?.editor?.exportHtml((data) => {
            resolve(data.html);
          });
        });
      },
      exportDesign: () => {
        return new Promise((resolve) => {
          editorRef.current?.editor?.exportDesign((design) => {
            resolve(JSON.stringify(design));
          });
        });
      },
    }));

    // Export HTML on change
    const handleLoad = () => {
      editorRef.current?.editor?.addEventListener("design:updated", () => {
        editorRef.current?.editor?.exportHtml((data) => {
          onChange?.(data.html);
        });
      });
    };

    return (
      <div className={className}>
        <EmailEditor ref={editorRef} onLoad={handleLoad} />
      </div>
    );
  }
);

UnlayerEditor.displayName = "UnlayerEditor";

export default UnlayerEditor;
