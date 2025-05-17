"use client";
import { Button, IconButton } from "@/components/atoms";
import ConfirmationDeleteModal from "@/components/molecules/confirmationModal/deleteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";

export const action = ({
  edit,
  deleteBtn,
  deleteBtnLink,
  deleteModalText,
  btnText,
  view,
  key,
}: {
  edit?: boolean;
  deleteBtn?: boolean;
  deleteBtnLink?: string;
  deleteModalText?: string;
  btnText?: string;
  view?: boolean;
  key?: string;
}) => {
  return {
    accessorKey: "actions",
    header: () => <div>Action</div>,
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original;
      return (
        <div className="flex gap-4">
          {btnText && <Button rounded={8} variant="primary" >{btnText}</Button>}
          {edit &&<IconButton bgColor="blue" className="cursor-pointer text-white"><Pencil size={20}/></IconButton> }
          {view && <Eye size={20}/>}
          {deleteBtn && (
            <ConfirmationDeleteModal
              text={deleteModalText||''}
              url={`${deleteBtnLink}/${data?.id}`}
              qkey={key}
            >
              <IconButton bgColor="red" className="cursor-pointer text-white">
                <Trash2 size={20}/>
              </IconButton>
            </ConfirmationDeleteModal>
          )}
        </div>
      );
    },
  };
};

const getNestedValue = (obj: any, path: string, fallback = "--") => {
  try {
    const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    return (
      parts.reduce((acc, key) => {
        if (acc && typeof acc === "object") {
          return acc[key];
        }
        return undefined;
      }, obj) ?? fallback
    );
  } catch {
    return fallback;
  }
};
const customColummn = (values: {
  key: string;
  label: string;
  extra?: string;
  avatar?: boolean;
  icon?: string;
  children?: ReactNode;
  input?: boolean;
  width?: number;
  showExtraNode?: boolean;
  type?: string;
}) => {
  return {
    accessorKey: values?.key,
    size: values.width || 100,
    showExtraNode: values?.showExtraNode,
    header: () => <div className="text-nowrap">{values.label}</div>,
    cell: ({ row }: any) => {
      const value: any = getNestedValue(row.original, values.key) || "--"; // Ensure value exists
      let date;
      let time;
      if(values?.type==="date"){
        date = dayjs(value).format("YYYY MMM, DD")
        time = dayjs(value).format("hh:mm A");
      }
      const avatarSrc = row.original.avatar || "/assets/images/img.png";
      const extra = values.extra
        ? getNestedValue(row.original, values.extra)
        : null;
      return (
        <div
          className={`flex gap-3 items-center ${
            values.showExtraNode && "cursor-pointer"
          }`}
        >
          {values?.children && values?.children}
          {values.avatar && (
            <Avatar>
              <AvatarImage src={avatarSrc} alt="Avatar" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          )}
          {values.type==="date"?
          <div>
            <p className="text-[#111827]">{date}</p>
            <p className="text-sm text-[#6B7280]">{time}</p>
          </div>
           : (
            <div>
              <h1
                className={cn(
                  values.key === "teacher" || values.key === "student"
                    ? "text-base font-medium"
                    : values?.key === "packageStatus"
                    ? value === "Normal"
                      ? "bg-[#DBEAFE] text-[#2563EB] text-sm px-4 py-1 w-fit rounded-full"
                      : "bg-[#F2E7FC] text-[#925FE2] text-sm px-4 py-1 w-fit rounded-full"
                    : "text-sm"
                )}
              >
                {value}
              </h1>
              {extra && (
                <p
                  className={cn(
                    values.key === "teacher" || values.key === "student"
                      ? "text-[#111827]"
                      : "text-[#6B7280]",
                    "text-sm"
                  )}
                >
                  {extra}
                </p>
              )}
            </div>
          )}
        </div>
      );
    },
  };
};


export const studentMaterialColumn = [
  customColummn({ key: "name", label: "Category", width:200}),
  customColummn({ key: "status", label: "Status" }),
  customColummn({ key: "requiresVerification", label: "Requires Verification", width:250 }),
  customColummn({ key: "createdAt", label: "Created At", type:'date', width:150}),
  action({ edit: true, deleteBtn: true })
];
export const subCategoryColumn = [
  customColummn({ key: "name", label: "Sub Category", width:200}),
  customColummn({ key: "name2", label: "Category", width:200}),
  customColummn({ key: "status", label: "Status" }),
  customColummn({ key: "createdAt", label: "Created At", type:'date', width:150}),
  action({ edit: true, deleteBtn: true })
];
export const feedbacksDashboardColumn = [
  customColummn({ key: "name", label: "Title", width:200}),
  customColummn({ key: "name2", label: "Category", width:200}),
  customColummn({ key: "name3", label: "Subcategory", width:200}),
  customColummn({ key: "question", label: "Question", width:200}),
  customColummn({ key: "status", label: "Status" }),
  customColummn({ key: "createdAt", label: "Created At", type:'date', width:150}),
];







