"use client";
import {
  Button,
  CardTemplate,
  FormFeilds,
  FormTemplate,
} from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutate } from "@/hooks/generalHooks";
import { profileSchema } from "@/lib/schemas";
import React from "react";

const ProfileForm = ({user}:{user:Record<string,any>}) => {

  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async(values:any)=>{
    await MutateFunc({url:'auth/profile',method:'PUT',body:values})
  }
  console.log(user)
  return (
    <CardTemplate
      title={{ comp: "Account Settings" }}
      desc={{ comp: "Make changes to your account here." }}
    >
      <FormTemplate
        onSubmit={onSubmit}
        schema={profileSchema}
        defaultValues={{
          fname: user?.fname||"",
          lname: user?.lname||"",
          country: user?.country||"",
          state: user?.state||"",
          education: user?.education||"",
          profession: user?.profession||"",
          bio: user?.bio||"", 
        }}
        className="space-y-4"
      >
        <Separator />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "fname" }}
            label={{ text: "First Name" }}
          >
            {(field) => <Input {...field} value={field.value} placeholder="First Name" />}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "lname" }}
            label={{ text: "Last Name" }}
          >
            {(field) => <Input {...field} value={field.value} placeholder="Last Name" />}
          </FormFeilds>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "country" }}
            label={{ text: "Country" }}
          >
            {(field) => <Input {...field} value={field.value} placeholder="Country" />}
          </FormFeilds>
          <FormFeilds fieldProps={{ name: "state" }} label={{ text: "State" }}>
            {(field) => <Input {...field} value={field.value} placeholder="State" />}
          </FormFeilds>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <FormFeilds
            fieldProps={{ name: "education" }}
            label={{ text: "Education" }}
          >
            {(field) => <Input {...field} value={field.value} placeholder="Education" />}
          </FormFeilds>
          <FormFeilds
            fieldProps={{ name: "profession" }}
            label={{ text: "Profession" }}
          >
            {(field) => <Input {...field} value={field.value} placeholder="Profession" />}
          </FormFeilds>
        </div>
        <FormFeilds fieldProps={{ name: "bio" }} label={{ text: "Bio" }}>
          {(field) => <Textarea {...field} value={field.value} placeholder="Bio" />}
        </FormFeilds>
        <Button
          type="submit"
          variant="primary"
          className="w-50 mr-0 ml-auto"
          loading={isPending}
        >
          Update Profile
        </Button>
      </FormTemplate>
    </CardTemplate>
  );
};

export default ProfileForm;
