import {
  CountryDropdown,
  DateRangePicker,
  FormFeilds,
} from "@/components/atoms";
import { Input } from "@/components/ui/input";
import { detailObjectsArray } from "@/data/constant";

const SchoolForm = ({
  feedback,
}: {
  feedback: Record<string, any>;
}) => {
  // if (!feedback?.details) return null;
  return (
    <div className="outline-muted rounded-md p-6 outline-2 flex flex-col w-full gap-4">
      <h3 className="font-bold">Meta Form:</h3>
      {detailObjectsArray.map((detail: Record<string,any>, i:number) => {
        // if (detail === "salary") return null;
        // if (!feedback?.details[detail]) return null;

        const text = detail?.name?.split(/(?=[A-Z])/).join(" ");
        // const type = detailType[detail];
        return (
          <FormFeilds key={`detail-${i}`} fieldProps={{name:`details.${detail?.name}`, className:"flex gap-2"}} label={{text, className:"capitalize flex-grow w-sm"}}>
            {(field:any) =>
              detail?.type === "dropdown" ? (
                <CountryDropdown
                  value={field.value}
                  onChange={field.onChange}
                />
              ) : detail?.type === "date-range" ? (
                <DateRangePicker date={field.value} setDate={field.onChange} />
              ) : (
                <Input
                  type={detail?.type}
                  value={field.value ?? ""}
                  placeholder={detail?.placeholder}
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
