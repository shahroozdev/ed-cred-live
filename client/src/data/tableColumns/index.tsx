"use client";
import {
  Button,
  FormFeilds,
  FormTemplate,
  IconButton,
} from "@/components/atoms";
import HTMLContent from "@/components/atoms/htmlContent";
import { ChangeCategoryModal, CustomModal } from "@/components/molecules";
import ConfirmationDeleteModal from "@/components/molecules/confirmationModal/deleteModal";
import EditModal from "@/components/molecules/customModal/editModal";
import Modal from "@/components/molecules/modal";
import VerifyUserCard from "@/components/pages/admin/users/components/verifyUserCard";
import CreatePost from "@/components/Posts/CreatePost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutate } from "@/hooks/generalHooks";
import { cn } from "@/lib/utils";
import { Question } from "@/types";
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
import Link from "next/link";
import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const UpdateStatus = ({
  data,
  values,
}: {
  data: Record<string, any>;
  values: {
    options?: { label: string; value: string }[];
    text?: string;
    link?: string;
    icon?: ReactNode;
    key?: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (value: Record<string, any>) => {
    await MutateFunc({
      url: `${values?.link}/${data?.id}` || "",
      method: "PUT",
      body: { ...value, id: data?.id },
      tags: values?.key,
      onSuccess: () => setIsOpen(false),
    });
  };

  return (
    <>
      <Modal
        title={"Update Status"}
        trigger={
          <IconButton bgColor={`purple`} className="text-white">
            <span title={"Change Category"}>{values?.icon || <Repeat1 />}</span>
          </IconButton>
        }
        open={isOpen}
        setIsOpen={setIsOpen}
      >
        <FormTemplate
          onSubmit={onSubmit}
          defaultValues={{ status: data?.status }}
          className="space-y-2"
        >
          <FormFeilds
            fieldProps={{ name: "status" }}
            label={{ text: "Status" }}
          >
            {(field) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-md">
                  <SelectValue placeholder={"Select Status"} />
                </SelectTrigger>
                <SelectContent>
                  {values?.options?.map((item, idx) => {
                    return (
                      <SelectItem key={idx} value={item.value}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </FormFeilds>
          <div className="flex justify-end mr-4">
            <Button variant="primary" type="submit" loading={isPending}>
              Submit
            </Button>
          </div>
        </FormTemplate>
      </Modal>
    </>
  );
};
export const action = ({
  edit,
  editModal,
  deleteBtn,
  btnText,
  view,
  key,
  changeCategory,
  verifyDocument,
  accept,
  reject,
  children,
  setQuestionsList,
  statusUpdate,
}: {
  edit?: string;
  editModal?: ReactElement;
  deleteBtn?: { text?: string; link?: string };
  statusUpdate?: {
    options?: { label: string; value: string }[];
    text?: string;
    link?: string;
    icon?: ReactNode;
    key?: string;
  };
  btnText?: string;
  view?: string;
  key?: string;
  changeCategory?: boolean;
  verifyDocument?: boolean;
  accept?: boolean;
  reject?: boolean;
  children?: (data: any) => ReactElement;
  setQuestionsList?: Dispatch<SetStateAction<Question[] | []>>;
}) => {
  return {
    accessorKey: "actions",
    header: () => <div>Action</div>,
    enableHiding: false,
    cell: ({ row }: any) => {
      const data = row.original;
      // console.log(data)
      return (
        <div className="flex gap-1">
          {statusUpdate && <UpdateStatus data={data} values={statusUpdate} />}
          {setQuestionsList && (
            <IconButton bgColor="red" className="cursor-pointer text-white">
              <span
                title={"Delete"}
                onClick={() =>
                  setQuestionsList((prev) =>
                    prev.filter((_) => _?.text !== data?.text)
                  )
                }
              >
                <Trash2 size={20} />
              </span>
            </IconButton>
          )}
          {children && typeof children === "function" && children(data)}
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
              disabled={data?.accepted}
            >
              <IconButton
                bgColor={data?.accepted ? "gray" : "green"}
                className={`${
                  data?.accepted ? "cursor-not-allowed" : "cursor-pointer"
                }  text-white px-2`}
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
              <Link href={`${edit}/${data?.id}`} title={"Edit"}>
                <Pencil size={20} />
              </Link>
            </IconButton>
          )}
          {view && (
            <IconButton
              bgColor="blue"
              className="cursor-pointer text-white px-2"
            >
              {" "}
              <Link href={`${view}/${data?.id}`} title={"View"}>
                <Eye />
              </Link>
            </IconButton>
          )}
          {editModal && (
            <EditModal data={data}>
              {(modalData, setIsOpen) => {
                return React.cloneElement(editModal as any, {
                  data: modalData,
                  setIsOpen,
                });
              }}
            </EditModal>
          )}
          {reject && (
            <ConfirmationDeleteModal
              text={"Want to Reject This Response."}
              url={`/feedback-responses/${data?.id}/reject`}
              type="PATCH"
              qkey={key}
              disabled={data?.status === "Rejected"}
            >
              <IconButton
                bgColor={data?.status === "Rejected" ? "gray" : "red"}
                className={`${
                  data?.status === "Rejected"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }  text-white px-2`}
              >
                <span title={"Reject Documment"}>
                  <X size={20} />
                </span>
              </IconButton>
            </ConfirmationDeleteModal>
          )}
          {deleteBtn && (
            <ConfirmationDeleteModal
              text={deleteBtn?.text || ""}
              url={`${deleteBtn?.link}/${data?.id}`}
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
  ellipses?: boolean;
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
      const status = { Accepted: "", Rejected: "", Pending: "" };
      return (
        <div
          className={`flex gap-3 items-center ${
            values?.ellipses && "line-clamp-2"
          }${values.showExtraNode && "cursor-pointer"}`}
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
            <p className="!line-clamp-2 ">{value}</p>
          ) : values.key === "text" || values?.key === "body" ? (
            <HTMLContent
              value={value}
              className="line-clamp-2 !overflow-hidden !p-0"
            />
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
          ) : values.key === "accepted" ? (
            <p
              className={`${
                row?.original?.status === "Accepted"
                  ? "text-green-500 bg-green-300"
                  : row?.original?.status === "Rejected"
                  ? "text-red-500 bg-red-300"
                  : "text-orange-500 bg-orange-300"
              } rounded-4xl px-2 py-1`}
            >
              {row?.original?.status}
            </p>
          ) : (
            <div>
              <p className={"text-sm"}>{value}</p>
              {extra && <p className={"text-sm"}>{extra}</p>}
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
    edit: "/category/edit",
    deleteBtn: { link: "/category", text: "Want To Delete This Category?" },
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
    edit: "/subcategory/edit/",
    deleteBtn: {
      link: "/subcategory",
      text: "Want To Delete This Subcategory?",
    },
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
    deleteBtn: { link: "/feedback-form", text: "Want To Delete This Form?" },
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
    deleteBtn: { link: "/users", text: "Want To Delete This user?" },
    changeCategory: true,
    verifyDocument: true,
  }),
];
export const postsAdminColumn = [
  customColummn({ key: "title", label: "Title", width: 200 }),
  customColummn({ key: "body", label: "Description", width: 200 }),
  customColummn({ key: "featured", label: "Featured", width: 200 }),
  customColummn({ key: "status", label: "Status", width: 200 }),
  customColummn({
    key: "createdAt",
    label: "Joined On",
    type: "date",
    width: 150,
  }),
  action({
    statusUpdate: {
      options: [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
      ],
      link: "/posts",
      key: "posts",
    },
    editModal: <CreatePost />,
    deleteBtn: { link: "/posts", text: "Want To Delete This Post?" },
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
  customColummn({ key: "accepted", label: "Status", width: 120 }),
  customColummn({
    key: "submittedAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    accept: true,
    edit: "/feedback/responses/edit",
    reject: true,
  }),
];

export const adminQuestionColumn = [
  customColummn({ key: "text", label: "Question", width: 300 }),
  customColummn({ key: "type", label: "Question Type" }),
];
export const adminForumColumn = [
  customColummn({ key: "title", label: "Title", width: 200 }),
  customColummn({ key: "text", label: "Question", ellipses: true }),
  customColummn({ key: "createdAt", label: "Created At", type: "date" }),
  action({
    deleteBtn: {
      link: "/feedback-question",
      text: "Want To Delete This Forum?",
    },
    key: "forumList",
  }),
];
export const adminDisputeColumn = [
  customColummn({
    key: "disputedBy.username",
    label: "Disputed By",
    width: 100,
  }),
  customColummn({
    key: "feedbackResponse.feedbackForm.title",
    label: "Feedback Form Title",
    ellipses: true,
    width: 200,
  }),
  customColummn({ key: "reason", label: "Reason", ellipses: true, width: 200 }),
  customColummn({ key: "status", label: "Status", ellipses: true, width: 200 }),
  customColummn({
    key: "createdAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    deleteBtn: { link: "/disputes", text: "Want To Delete This Dispute?" },
    key: "disputes",
    view: "/disputes/detail",
  }),
];
export const userDisputeColumn = [
  customColummn({
    key: "feedbackResponse.feedbackForm.title",
    label: "Feedback Form Title",
    ellipses: true,
    width: 200,
  }),
  customColummn({ key: "reason", label: "Reason", ellipses: true, width: 200 }),
  customColummn({ key: "status", label: "Status", width: 200 }),
  customColummn({
    key: "createdAt",
    label: "Created At",
    type: "date",
    width: 150,
  }),
  action({
    deleteBtn: { link: "/disputes", text: "Want To Delete This Dispute?" },
    view: "/disputes/detail",
    key: "disputes",
  }),
];
