"use server";
import { oneDay } from "@/data/constant";
import apiClient from "@/lib/apiClient";
import { revalidatePath, revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";


export async function getServerSideDataWithFeatures(props: {
  url: string;
  key?: string | string[];
  noRedirect?: boolean;
}) {
  "use server";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(process.env.BASE_URL + props?.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: Array.isArray(props.key)
          ? props.key
          : props.key
          ? [props.key]
          : [],
      },
    });
    // console.log(props.url, token, response.status, props.noRedirect);

    if (response.status === 401 && !props?.noRedirect) {
      cookieStore.set({
        name: "sessionOut",
        value: "yes",
        httpOnly: true,
        path: "/",
        secure: true,
        maxAge: oneDay,
      });
      throw redirect("/login");
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    if (isRedirectError(err)) {
      throw err; // Rethrow redirect errors to allow Next.js to handle them
    }
    return null;
  }
}

export async function mutateData(value: {
  url: string;
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  revalidatePage?: string;
  revalidateTags?: string | string[];
  body?: any;
  allowMulti?: boolean;
}) {
  "use server";
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(value?.allowMulti
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
    "x-Requested-With": "XMLHttpRequest",
  };
  const methodHandlers = {
    POST: () => apiClient.post({ url: value?.url, data: value?.body, headers }),
    PUT: () => apiClient.put({ url: value?.url, data: value?.body, headers }),
    PATCH: () =>
      apiClient.patch({ url: value?.url, data: value?.body, headers }),
    DELETE: () => apiClient.delete({ url: value?.url, headers }),
  } as any;

  if (!["POST", "PUT", "DELETE", "PATCH"].includes(value?.method)) {
    throw new Error(`Invalid method: ${value?.method}`);
  }
  let success = false;
  try {
    const response = await methodHandlers[value?.method]?.();
    success = true;

    if (response?.token && response?.user && response?.status === 200) {
      const { token, user } = response;
      const cookieStore = await cookies();
      cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        secure: true,
        maxAge: oneDay,
      });
      cookieStore.set({
        name: "user",
        value: JSON.stringify(user),
        httpOnly: true,
        path: "/",
        secure: true,
        maxAge: oneDay,
      });
      await setCookie("sessionOut", "no");
    }

    return response;
  } catch (err: any) {
    return err?.response?.data;
  } finally {
    if (success) {
      if (value?.revalidatePage) {
        revalidatePath(value?.revalidatePage);
      }
      if (value?.revalidateTags) {
        const tags = Array.isArray(value.revalidateTags)
          ? value.revalidateTags
          : [value.revalidateTags];
        for (const tag of tags) {
          revalidateTag(tag);
        }
      }
    }
  }
}
export const revalidateWholeRoute = async (url: string) => {
  await revalidatePath(url);
};
export const revalidateTags = async (tags: string | string[]) => {
  const keys = Array.isArray(tags) ? tags : [tags];
  for (const tag of keys) {
    revalidateTag(tag);
  }
};
export const getCookie = async <T>(
  key: string
): Promise<T | null | undefined> => {
  // Check if running on the server or client
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  if (cookie?.value) {
    return JSON.parse(cookie?.value) as T;
  }
};
export const getStringCookie = async (
  key: string
): Promise<string | null | undefined> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie?.value;
};
export const setCookie = async <T>(key: string, value: T): Promise<void> => {
  const twoDay = 48 * 60 * 60;
  const cookieStore = await cookies();
  cookieStore.set({
    name: key,
    value: String(value),
    httpOnly: true,
    path: "/",
    secure: true,
    maxAge: twoDay,
  });
};
export const removeCookie = async (key: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};
