"use client";
import {
  Button,
  CardTemplate,
  FormFeilds,
  FormTemplate,
} from "@/components/atoms";
import PasswordInput from "@/components/atoms/passwordInput";
import Select3 from "@/components/atoms/select/select3";
import SubCategorySelect2 from "@/components/atoms/subCategorySelect/index2";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutate } from "@/hooks/generalHooks";
import { CreateUserSchema, UpdateUserSchema } from "@/lib/schemas";
import React from "react";

const CreateUserComponent = ({
  data,
  setIsOpen,
}: {
  data?: Record<string, any>;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (values: any) => {
    await MutateFunc({
      url: "auth/create-update-user",
      method: "POST",
      body: { ...values, ...(data?.id ? { id: data?.id } : {}) },
      tags:'usersList',
      sendTo: "/users",
      onSuccess: () => setIsOpen && setIsOpen(false),
    });
  };
//   console.log(data)
  return (
    <CardTemplate
      title={{ comp: data?.id?"Edit User":"Create New User" }}
      desc={{ comp: data?.id?"Edit User Details":"Create a new user account here." }}
    >
      <FormTemplate
        onSubmit={onSubmit}
        schema={data?.id ? UpdateUserSchema : CreateUserSchema}
        defaultValues={{
          fname: data?.fname || "",
          lname: data?.lname || "",
          country: data?.country || "",
          state: data?.state || "",
          username: data?.username || "",
          education: data?.education || "",
          profession: data?.profession || "",
          bio: data?.bio || "",
          email: data?.email || "",
          password: "",
          status: "active",
          categoryId: data?.category?.id ? String(data?.category?.id) : "",
        }}
        className="space-y-4"
      >
        <Separator />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "fname" }}
            label={{ text: "First Name" }}
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="First Name" />
            )}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "lname" }}
            label={{ text: "Last Name" }}
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="Last Name" />
            )}
          </FormFeilds>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "username" }}
            label={{ text: "Username" }}
            required
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="First Name" />
            )}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "email" }}
            label={{ text: "Email" }}
            required
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="Last Name" />
            )}
          </FormFeilds>
        </div>
        {!data?.id && (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormFeilds
              fieldProps={{ name: "password" }}
              label={{ text: "Password" }}
              required
            >
              {(field) => (
                <PasswordInput
                  {...field}
                  value={field.value}
                  placeholder="Password"
                />
              )}
            </FormFeilds>
            <FormFeilds
              fieldProps={{ name: "confirmPassword" }}
              label={{ text: "Confirm Password" }}
              required
            >
              {(field) => (
                <PasswordInput
                  {...field}
                  value={field.value}
                  placeholder="Confirm Password"
                />
              )}
            </FormFeilds>
          </div>
        )}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "categoryId" }}
            label={{ text: "Category" }}
            required
          >
            {(field) => (
              <SubCategorySelect2
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select Category"
              />
            )}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "status" }}
            label={{ text: "Status" }}
            required
          >
            {(field) => (
              <Select3
                {...field}
                value={field.value}
                onValueChange={field.onChange}
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            )}
          </FormFeilds>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "country" }}
            label={{ text: "Country" }}
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="Country" />
            )}
          </FormFeilds>
          <FormFeilds fieldProps={{ name: "state" }} label={{ text: "State" }}>
            {(field) => (
              <Input {...field} value={field.value} placeholder="State" />
            )}
          </FormFeilds>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "education" }}
            label={{ text: "Education" }}
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="Education" />
            )}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "profession" }}
            label={{ text: "Profession" }}
          >
            {(field) => (
              <Input {...field} value={field.value} placeholder="Profession" />
            )}
          </FormFeilds>
        </div>
        <FormFeilds fieldProps={{ name: "bio" }} label={{ text: "Bio" }}>
          {(field) => (
            <Textarea {...field} value={field.value} placeholder="Bio" />
          )}
        </FormFeilds>
        <Button
          type="submit"
          variant="primary"
          className="w-50 mr-0 ml-auto"
          loading={isPending}
        >
          Submit
        </Button>
      </FormTemplate>
    </CardTemplate>
  );
};

export default CreateUserComponent;
