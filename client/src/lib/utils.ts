import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const appendDataToFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    // Check if the value is an array
    if (Array.isArray(data[key])) {
      if (data[key]?.length > 0) {
        data[key].forEach((value: any, index: number) => {
          if (value !== undefined && value !== null) {
            return formData.append(`${key}[${index}]`, value);
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    } else if (typeof data[key] === "object" && key === "fields_status") {
      Object.entries(data[key]).forEach(([subKey, subValue]: [string, any]) => {
        formData.append(`${key}[${subKey}]`, subValue);
      });
    } else if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
      formData.append(key, data[key]);
    } else {
      return formData.append(key, "");
    }
  });
  return formData;
};