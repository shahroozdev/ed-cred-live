"use client";
import { Button, FormFeilds, FormTemplate } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutate } from "@/hooks/generalHooks";
import React, { Dispatch, SetStateAction } from "react";
import AddFeatures from "./components/AddFeatures";

const CreatePackageComponent = ({
  data,
  setIsOpen,
}: {
  data?: Record<string, any>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { MutateFunc, isPending } = useMutate();
  const onSubmit = async (values: any) => {
    await MutateFunc({
      url: "",
      body: {
        ...(data?.id ? { id: data?.id } : {}),
        ...values,
        features: values.features.map((item: any) => item?.value),
      },
      method: data?.id ? "PATCH" : "POST",
      sendTo: data?.id ? `/package/${data?.id}` : "/packages",
      onSuccess: () => setIsOpen && setIsOpen(false),
    });
  };
  return (
    <FormTemplate
      onSubmit={onSubmit}
      defaultValues={{
        title: data?.title || "",
        description: data?.description || "",
        features: data?.features
          ? data?.features?.map((item: string) => ({ value: item }))
          : [{ value: "" }],
        viewFeedbackLimit: data?.viewFeedbackLimit || "",
        giveFeedbackLimit: data?.giveFeedbackLimit || "",
        price: data?.price || "",
        durationDays: data?.durationDays || "",
      }}
      className="space-y-4"
    >
      <FormFeilds fieldProps={{ name: "title" }} label={{ text: "Title" }}>
        {(field) => <Input {...field} onChange={field.onChange} />}
      </FormFeilds>
      <FormFeilds
        fieldProps={{ name: "description" }}
        label={{ text: "Description" }}
      >
        {(field) => <Textarea {...field} onChange={field.onChange} />}
      </FormFeilds>
      <div className="mb-4">
        <label className="block font-medium mb-1">Features</label>
        <AddFeatures />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-5">
        <FormFeilds
          fieldProps={{ name: "viewFeedbackLimit" }}
          label={{ text: "View Feedback Limit" }}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={field.onChange}
              placeholder="0 means infinite"
            />
          )}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "giveFeedbackLimit" }}
          label={{ text: "Feedback Limit" }}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={field.onChange}
              placeholder="0 means infinite"
            />
          )}
        </FormFeilds>
        <FormFeilds fieldProps={{ name: "price" }} label={{ text: "Price" }}>
          {(field) => (
            <Input
              {...field}
              type="number"
              onChange={field.onChange}
              placeholder="Price"
            />
          )}
        </FormFeilds>
        <FormFeilds
          fieldProps={{ name: "durationDays" }}
          label={{ text: "Duration" }}
        >
          {(field) => (
            <Input
              {...field}
              type="number"
              onChange={field.onChange}
              placeholder="Duration in days"
            />
          )}
        </FormFeilds>
      </div>
      <Button
        // icon={<PlusIcon />}
        variant={"primary"}
        type="submit"
        loading={isPending}
      >
        Submit Forum
      </Button>
    </FormTemplate>
  );
};

export default CreatePackageComponent;
