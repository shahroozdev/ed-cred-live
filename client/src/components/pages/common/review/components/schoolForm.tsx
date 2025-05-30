import {
  CountryDropdown,
  DateRangePicker,
  FormFeilds,
} from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { detailType } from "@/data/constant";

const SchoolForm = ({
  feedback,
}: {
  feedback: Record<string, any>;
}) => {
  return (
    <div className="outline-muted rounded-md p-6 outline-2 flex flex-col w-full gap-4">
      {Object.keys(feedback.details).map((detail, i) => {
        if (!feedback.details[detail]) return null;

        const text = detail.split(/(?=[A-Z])/).join(" ");
        const type = detailType[detail];
        return (
          <FormFeilds key={`detail-${i}`} fieldProps={{name:`details.${detail}`, className:"flex gap-2"}} label={{text, className:"capitalize flex-grow w-sm"}}>
            {(field:any) =>
              type === "dropdown" ? (
                <CountryDropdown
                  value={field.value}
                  onChange={field.onChange}
                />
              ) : type === "date-range" ? (
                <DateRangePicker date={field.value} setDate={field.onChange} />
              ) : (
                <Input
                  type={type}
                  value={field.value ?? ""}
                  placeholder={text?.toLowerCase()}
                  {...field}
                />
              )
            }
          </FormFeilds>
        );
      })}
    </div>
  );
};

export default SchoolForm;
