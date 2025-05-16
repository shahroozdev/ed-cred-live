"use client";
import { z } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/atoms/button/Button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { CustomFormProps } from "@/types";
import { CustomInput } from "@/components/atoms";

const CustomForm = ({ props }: { props: CustomFormProps }) => {
  const [isPending, startTransition] = useTransition();
  const {
    schema,
    preNode,
    style,
    btnText,
    arr,
    onSubmit,
    defaultValues,
    postNode,
    btnCss,
    btnWidth,
    extraBtn,
    style2,
    btnIcon,
    btnDivClassName
  } = props;
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {}, // Use Zod schema as resolver for validation
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = methods;
  const onsubmit: SubmitHandler<any> = (values: any) => {
    startTransition(() => {
      onSubmit(values); // Ensure onSubmit from props is used
    });
  };

  return (
    <FormProvider {...methods}>
    <form
      onSubmit={handleSubmit(onsubmit)}
      className={`${style} p-10`}
      style={style2}
    >
      {preNode}
      {arr?.map((item: any, idx: number) => (
        <div key={idx} className="w-full">
          {item?.childs ? (
            <div className={item?.style}>
              {item?.childs?.map((ele: any, index: number) => (
                <CustomInput
                  props={{ item: ele, register, errors ,setValue}}
                  key={index}
                />
              ))}
            </div>
          ) : item?.type==="label"?(<>{item?.label}</>
          ) : (
            <CustomInput props={{ item, register, errors, setValue }} />
          )}
        </div>
      ))}
      {postNode}
      <div className={cn(btnDivClassName, "flex gap-4")}>
        {/* Extra Button - Can be Cancel, Reset, etc. */}
        {extraBtn && extraBtn}
        
        {btnText && (
          <Button
            icon={btnIcon}
            variant="primary"
            width={btnWidth}
            loading={isPending}
            disabled={isPending}
            rounded={8}
          >{btnText ||""}</Button>
        )}
      </div>
    </form>
    </FormProvider>
  );
};

export default CustomForm;
