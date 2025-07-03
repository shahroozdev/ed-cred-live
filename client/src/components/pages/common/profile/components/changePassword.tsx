"use client";
import { Button, CardTemplate, FormFeilds, FormTemplate } from "@/components/atoms";
import PasswordInput from "@/components/atoms/passwordInput";
import { Separator } from "@/components/ui/separator";
import { useMutate } from "@/hooks/generalHooks";
import { changePasswordSchema } from "@/lib/schemas";

import React from "react";

const ChangePassword = () => {
  const {MutateFunc, isPending} = useMutate();
  const onSubmit = async(values:any)=>{
    await MutateFunc({url:'/auth/change-password', method:'POST', body:values})
  }
  return (
    <CardTemplate
      title={{ comp: "Change Password"}}
      desc={{ comp: "Make changes to your account here." }}
    >
      <FormTemplate
        onSubmit={onSubmit}
        schema={changePasswordSchema}
        defaultValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
        className="space-y-4"
      >
        <Separator/>
        <FormFeilds
          fieldProps={{ name: "oldPassword" }}
          label={{ text: "Old Password" }}
        >
          {(field) => <PasswordInput {...field} placeholder="Old Password" />}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "newPassword" }}
          label={{ text: "New Password" }}
        >
          {(field) => <PasswordInput {...field} placeholder="New Password" />}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "confirmPassword" }}
          label={{ text: "Confirm Password" }}
        >
          {(field) => (
            <PasswordInput {...field} placeholder="Confirm Password" />
          )}
        </FormFeilds>
        <Button
          type="submit"
          variant="primary"
          className="w-50 mr-0 ml-auto"
          loading={isPending}
        >
          Update Password
        </Button>
      </FormTemplate>
    </CardTemplate>
  );
};

export default ChangePassword;
