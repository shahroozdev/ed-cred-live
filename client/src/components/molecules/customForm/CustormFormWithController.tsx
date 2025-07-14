import { Button, FormTemplate, ResetBtn } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { CustomFormProps } from "@/types";
import { X } from "lucide-react";
import React, { useTransition } from "react";
import { SubmitHandler } from "react-hook-form";

const CustormFormWithController = ({ props }: { props: CustomFormProps }) => {
  const [isPending, startTransition] = useTransition();
  const onsubmit: SubmitHandler<any> = (values: any) => {
    startTransition(() => {
      props?.onSubmit(values); // Ensure onSubmit from props is used
    });
  };
  return (
    <FormTemplate
      schema={props?.schema}
      onSubmit={onsubmit}
      defaultValues={props?.defaultValues}
      className={props?.className}
    >
      {props?.preNode && props?.preNode}
      {props?.postNode && props?.postNode}
      <div className={cn(props?.btnDivClassName, "flex gap-4")}>
        {/* Extra Button - Can be Cancel, Reset, etc. */}
        {props?.extraBtn && props?.extraBtn}
        {props?.resetBtn && <ResetBtn icon={<X />} text="Clear All" />}
        {props?.btnText && (
          <Button
            icon={props?.btnIcon}
            variant="primary"
            width={props?.btnWidth}
            loading={isPending}
            disabled={isPending}
            rounded={8}
          >
            {props?.btnText || ""}
          </Button>
        )}
      </div>
    </FormTemplate>
  );
};

export default CustormFormWithController;
