"use client";
import { Button, IconButton } from "@/components/atoms";
import { ChangeCategoryModal } from "@/components/molecules";
import ConfirmationDeleteModal from "@/components/molecules/confirmationModal/deleteModal";
import VerifyUserCard from "@/components/pages/admin/users/components/verifyUserCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import {
  Check,
  Eye,
  Pencil,
  Repeat1,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";
import { ReactNode } from "react";

export const action = ({
  edit,
  deleteBtn,
  deleteBtnLink,
  deleteModalText,
  btnText,
  view,
  key,
  changeCategory,
  verifyDocument,
  accept,
  reject,
}: {
  edit?: boolean;
  deleteBtn?: boolean;
  deleteBtnLink?: string;
  deleteModalText?: string;
  btnText?: string;
  view?: boolean;
  key?: string;
  changeCategory?: boolean;
  verifyDocument?: boolean;
  accept?: boolean;
  reject?: boolean;
}) => {
  return {
    accessorKey: "actions",
    header: () => <div>Action</div>,
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original;
      return (
        <div className="flex gap-1">
          {btnText && (
            <Button rounded={8} variant="primary">
              {btnText}
            </Button>
          )}
          {accept && (
            <ConfirmationDeleteModal
              text={"Want to Accept This Response."}
              url={`/feedback-responses/${data?.id}/accept`}
              type="PATCH"
              qkey={key}
            >
              <IconButton
                bgColor="green"
                className="cursor-pointer text-white px-2"
              >
                <span title={"Accept Document"}>
                  <Check size={20} />
                </span>
              </IconButton>
            </ConfirmationDeleteModal>
          )}
          {edit && (
            <IconButton
              bgColor="black"
              className="cursor-pointer text-white px-2"
            >
              {" "}
              <span title={"Edit"}>
                <Pencil size={20} />
              </span>
            </IconButton>
          )}
          {reject && (
            <ConfirmationDeleteModal
              text={"Want to Reject This Response."}
              url={`/feedback-responses/${data?.id}/reject`}
               type="PATCH"
              qkey={key}
            >
              <IconButton
                bgColor="red"
                className="cursor-pointer text-white px-2"
              >
                <span title={"Reject Documment"}>
                  <X size={20} />
                </span>
              </IconButton>
            </ConfirmationDeleteModal>
          )}
          {view && <Eye size={20} />}
          {deleteBtn && (
            <ConfirmationDeleteModal
              text={deleteModalText || ""}
              url={`${deleteBtnLink}/${data?.id}`}
              qkey={key}
            >
              <IconButton bgColor="red" className="cursor-pointer text-white">
                <span title={"Delete"}>
                  <Trash2 size={20} />
                </span>
              </IconButton>
            </ConfirmationDeleteModal>
          )}
          {changeCategory && (
            <ChangeCategoryModal data={data} qkey={key}>
              <IconButton bgColor={`purple`} className="text-white">
                <span title={"Change Category"}>
                  <Repeat1 />
                </span>
              </IconButton>
            </ChangeCategoryModal>
          )}
          {verifyDocument && (
            <VerifyUserCard user={data}>
              <IconButton bgColor={`green`} className="text-white">
                <span title={"Verify Document"}>
                  <UserCheck />
                </span>
              </IconButton>
            </VerifyUserCard>
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
      if (values?.type === "date") {
        date = dayjs(value).format("YYYY MMM, DD");
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
          {values.type === "date" ? (
            <div>
              <p className="text-[#111827]">{date}</p>
              <p className="text-sm text-[#6B7280]">{time}</p>
            </div>
          ) : values.key === "questions" ? (
            <>{value?.length}</>
          ) : values.key === "featured" ? (
            <>{row.original.featured ? "Yes" : "No"}</>
          ) : values.key === "description" ? (
            <p className="line-clamp-2">{value}</p>
          ) : values.key === "isDraft" ? (
            <p
              className={`${
                row?.original?.isDraft ? "text-red-500" : "text-green-500"
              }`}
            >
              {row?.original?.isDraft ? "draft" : "active"}
            </p>
          ) : values.key === "isVerified" ? (
            <p
              className={`${
                row?.original?.isVerified
                  ? "text-green-500 bg-green-300"
                  : "text-red-500 bg-red-300"
              } rounded-4xl px-2 py-1`}
            >
              {row?.original?.isVerified ? "Verified" : "Not Verified"}
            </p>
          ) : (
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
  customColummn({ key: "name", label: "Category", width: 200 }),
  customColummn({ key: "status", label: "Status" }),
  customColummn({
    key: "requiresVerification",
    label: "Requires Verification",
    width: 250,
  }),
  customColummn({
    key: "createdAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    edit: true,
    deleteBtn: true,
    deleteBtnLink: "/category",
    deleteModalText: "Want To Delete This Category?",
  }),
];
export const subCategoryColumn = [
  customColummn({ key: "name", label: "Sub Category", width: 200 }),
  // customColummn({ key: "parentCategory.name", label: "Category", width: 200 }),
  customColummn({ key: "status", label: "Status" }),
  customColummn({
    key: "createdAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    edit: true,
    deleteBtn: true,
    deleteBtnLink: "/subcategory",
    deleteModalText: "Want To Delete This SubCategory?",
  }),
];
export const feedbacksDashboardColumn = [
  customColummn({ key: "title", label: "Title", width: 200 }),
  customColummn({ key: "category.name", label: "Category", width: 200 }),
  customColummn({ key: "subcategory.name", label: "Subcategory", width: 200 }),
  customColummn({ key: "questions", label: "Question", width: 100 }),
  customColummn({ key: "isDraft", label: "Status" }),
  customColummn({
    key: "createdAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    deleteBtn: true,
    deleteBtnLink: "/feedback-form",
    deleteModalText: "Want To Delete This Form?",
  }),
];
export const usersAdminColumn = [
  customColummn({ key: "username", label: "Username", width: 200 }),
  customColummn({ key: "email", label: "Email", width: 200 }),
  customColummn({ key: "category.name", label: "Category", width: 200 }),
  customColummn({ key: "isVerified", label: "Status", width: 150 }),
  customColummn({
    key: "createdAt",
    label: "Joined On",
    type: "date",
    width: 150,
  }),
  action({
    deleteBtn: true,
    deleteBtnLink: "/users",
    deleteModalText: "Want To Delete This user?",
    changeCategory: true,
    verifyDocument: true,
  }),
];
export const postsAdminColumn = [
  customColummn({ key: "title", label: "Title", width: 200 }),
  customColummn({ key: "description", label: "Description", width: 200 }),
  customColummn({ key: "featured", label: "Featured", width: 200 }),
  customColummn({ key: "status", label: "Status", width: 200 }),
  customColummn({
    key: "createdAt",
    label: "Joined On",
    type: "date",
    width: 150,
  }),
  action({
    deleteBtn: true,
    deleteBtnLink: "/posts",
    deleteModalText: "Want To Delete This Post?",
  }),
];

export const feedbacksResponsesColumn = [
  customColummn({ key: "feedbackForm.title", label: "Title", width: 200 }),
  customColummn({
    key: "feedbackForm.category.name",
    label: "Category",
    width: 200,
  }),
  customColummn({
    key: "feedbackForm.subcategory.name",
    label: "Subcategory",
    width: 200,
  }),
  customColummn({ key: "questions", label: "Question", width: 100 }),
  customColummn({ key: "feedbackForm.isDraft", label: "Status" }),
  customColummn({
    key: "submittedAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    accept: true,
    edit: true,
    reject: true,
  }),
];
