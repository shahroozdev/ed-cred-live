import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const appendDataToFormData = (data: any) => {
  const formData = new FormData();

  const appendFormData = (formData: FormData, key: string, value: any) => {
    if (value === undefined || value === null) return;

    // If it's a Date
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    }
    // If it's a File or Blob
    else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    }
    // If it's an array
    else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        appendFormData(formData, `${key}[${index}]`, item);
      });
    }
    // If it's an object
    else if (typeof value === "object") {
      Object.entries(value).forEach(([childKey, childValue]) => {
        appendFormData(formData, `${key}[${childKey}]`, childValue);
      });
    }
    // Primitive (string, number, boolean)
    else {
      formData.append(key, value);
    }
  };

  Object.entries(data).forEach(([key, value]) => {
    appendFormData(formData, key, value);
  });

  return formData;
};


export const getAllParam = (data: any) => {
  const notParmas: any = ["productCountry", "productState", "category", "subcategory", "professiona", "profession1", "profession2", "profession3", "profession4", "profession5"];
  return Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value?.length > 0) {
          const formattedArray = value.map((item) => (typeof item === "string" ? `"${item}"` : item));
          return `${key}=[${formattedArray.join(",")}]`;
        } else {
          return null;
        }
      } else if (value !== null && value !== undefined && value !== "" && value !== "Invalid Date" && !notParmas.includes(key)) {
        return `${key}=${value}`;
      } else {
        return null; // Ignore null, undefined, or empty string values
      }
    })
    .filter((param) => param !== null) // Filter out null values
    .join("&");
};

export const convertToCents = (amount:number) => {
  return Math.round(amount * 100);
}