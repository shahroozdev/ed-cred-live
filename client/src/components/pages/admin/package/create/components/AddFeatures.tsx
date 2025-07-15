"use client";
import { Button } from "@/components/atoms";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const AddFeatures = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  return (
    <>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
        {fields.map((field, i) => (
          <div
            key={field.id}
            className="flex gap-2 items-center border-muted border-2 px-2 rounded-md"
          >
            <Input
              {...register(`features.${i}.value`)}
              placeholder={`Feature ${i + 1}`}
              className="flex-1 outline-none border-none appearance-none shadow-none"
            />
            <span
              className="cursor-pointer text-red-500 font-bold px-2"
              onClick={() => remove(i)}
            >
              &minus;
            </span>
          </div>
        ))}
      </div>
      <br />
      <Button
        type="button"
        variant="primary"
        onClick={() => append({ value: "" })}
        className="w-32"
      >
        Add Feature
      </Button>
    </>
  );
};

export default AddFeatures;
