"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import MultiSelectDropdown from "../select";
import { item } from "@/types";
import CategorySelect from "../categorySelect";
import SubCategorySelect from "../subCategorySelect";
import { cn } from "@/lib/utils";

const CustomInput = ({ item }: { item: item }) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
  } = useFormContext();
  const [showPassword, setshowPassword] = useState<boolean>(false);

  return (
    <div className={`flex flex-col ${item?.inputWidth || "w-full"}`}>
      {item?.label && item?.label}
      <label
        className={`flex items-center gap-2 ${
          item?.noBorder ? "" : ""
        } ${item?.hAuto ? "h-auto" : "h-10"} ${
          item?.bgColor || "bg-transparent"
        } ${item.pStyle || ""}`}
        htmlFor={item.inputName}
      >
        {item?.preNode && item?.preNode}
        {item.type === "category" ? (
          <CategorySelect control={control} inputName="categoryId" noLabel />
        ) : item.type === "subCategory" ? (
          <SubCategorySelect
            control={control}
            inputName="subCategoryId"
            noLabel
          />
        ) : item.type === "upload" ? (
          <div className="w-full">
            <label className="flex flex-col items-center gap-1 justify-center border-[#4B5563] rounded-2xl py-16 border-[1px] border-dashed">
              <Upload size={40} />
              <p>Drag and drop your files here, or click to browse</p>
              <p className="min-w-50 text-white w-50 rounded-lg text-center py-2 bg-blue-500 cursor-pointer">
                Upload files
              </p>
              <input
                className="hidden"
                type={"file"}
                {...(register && register(item?.inputName))}
                disabled={item?.disabled}
              />
            </label>
          </div>
        ) : item.type === "password" ? (
          <div className={`flex items-center grow `}>
            <input
              type={showPassword ? "text" : "password"}
              id={item?.inputName}
              {...(register && register(item?.inputName))}
              placeholder={item?.placeHolder}
              className={`grow p-2 h-10 appearance-none outline-none bg-transparent ${item?.style}`}
            />
            <div
              onClick={() => setshowPassword(!showPassword)}
              className=" cursor-pointer mr-2 opacity-60"
            >
              {!showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
        ) : item.type === "checkbox" ? (
          <div className="w-full flex justify-start">
            <input
              type={item.type}
              id={item.inputName}
              {...(register && register(item?.inputName))}
              className={`grow ${item?.style}`}
            />
            {item?.postNode}
          </div>
        ) : item?.type === "textarea" ? (
          <textarea
            id={item?.inputName}
            rows={item?.rows}
            placeholder={item?.placeHolder}
            {...(register && register(item?.inputName))}
            className={`grow p-2 ${item?.style}`}
          />
        ) : item?.type === "select"&& setValue ? (
          <MultiSelectDropdown
            item={item}
            register={register}
            setValue={setValue}
            mode={item?.mode}
          />
          // <select
          //   id={item?.inputName}
          //   {...(register && register(item?.inputName))}
          //   className={cn(
          //     "grow p-2 h-8 bg-transparent cursor-pointer appearance-none outline-none",
          //     item?.style
          //   )}
          // >
          //   {item?.placeHolder && (
          //     <option value="" disabled hidden>
          //       {item?.placeHolder || "Select an option"}
          //     </option>
          //   )}
          //   {item?.options?.map((option, index) => (
          //     <option
          //       key={index}
          //       value={option.value}
          //       className="text-black p-2 w-full cursor-pointer"
          //     >
          //       {option.label}
          //     </option>
          //   ))}
          // </select>
        ) : (
          <div
            className={`p-2 h-10 grow relative w-full ${item?.style} flex justify-between items-center`}
          >
            <input
              type={item?.type}
              id={item?.inputName}
              {...(register && register(item?.inputName))}
              placeholder={item?.placeHolder}
              className={` bg-transparent appearance-none w-full outline-none pr-10 ${
                item?.disabled && "!text-gray-500"
              }}`} // extra right padding for icon
              disabled={item?.disabled}
            />
          </div>
        )}
      </label>
      {item?.postNode && item?.postNode}
      {errors && errors[item?.inputName] && (
        <p className="text-red-500 text-sm">
          {String(errors[item.inputName]?.message)}
        </p>
      )}
    </div>
  );
};

export default CustomInput;

// <select
//   id={item?.inputName}
//   {...register && register(item?.inputName)}
//   defaultValue=""
//   className={cn("grow p-2 h-10 bg-transparent cursor-pointer appearance-none outline-none", item?.style)}
// >
//   {item?.placeHolder&&<option value="" disabled hidden>
//     {item?.placeHolder || "Select an option"}
//   </option>}
//   {item?.options?.map((option, index) => (
//     <option key={index} value={option.value} className="text-black p-2 w-full cursor-pointer">
//       {option.label}
//     </option>
//   ))}
// </select>
