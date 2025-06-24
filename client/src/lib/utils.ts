import { types } from "@/data/constant";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// In appendDataToFormData.ts
export const appendDataToFormData = (
  data: Record<string, any>,
  formData: FormData = new FormData(),
  parentKey?: string
): FormData => {
  Object.entries(data).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}.${key}` : key;

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      formData.append(formKey, String(value));
    } else if (Array.isArray(value)) {
      // Check if it's an array of files
      if (value.every(item => item instanceof File || item instanceof Blob)) {
        // ✅ append all files under the same key, no brackets
        value.forEach(file => {
          formData.append(formKey, file);
        });
      } else {
        // Recursively handle nested data
        value.forEach((item, index) => {
          appendDataToFormData(item, formData, `${formKey}[${index}]`);
        });
      }
    } else if (value && typeof value === 'object') {
      appendDataToFormData(value, formData, formKey);
    }
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

export const sortByType = (data: any[] ) => {
    const audio = data?.filter((key: any) => types["audio"].includes(key?.folder_path?.split(".").pop()));
    const videos = data?.filter((key: any) => types["video"].includes(key?.folder_path?.split(".").pop()));
    const docs = data?.filter((key: any) => types["doc"].includes(key?.folder_path?.split(".").pop()));
    const image = data?.filter((key: any) => types["image"].includes(key?.folder_path?.split(".").pop()));
    return {audio, videos, docs, image};
};

export const typeOfFile = (data: string | string[]) => {
  const getType = (ext: string) => {
    if (types.audio.includes(ext)) return 'audio';
    if (types.video.includes(ext)) return 'video';
    if (types.image.includes(ext)) return 'image';
    if (types.document.includes(ext)) return 'application';
    return 'unknown';
  };

  if (Array.isArray(data)) {
    return data.map((item) => getType(item));
  } else {
    return getType(data);
  }
};