"use client";
import {
  getServerSideDataWithFeatures,
  mutateData,
  removeCookie,
} from "@/actions/serverActions";
import { appendDataToFormData } from "@/lib/utils";
import { QueryProps } from "@/types";
// import { QueryProps } from "@/types/entities";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export async function MutateFunc(value: {
  url: string;
  method: "POST" | "PUT" | "DELETE";
  body?: any;
  sendTo?: string;
  noLoader?: boolean;
  noPopup?: boolean;
  tags?: string | string[];
  allowMulti?: boolean;
  onSuccess?: any;
  path?: string;
  router?: any;
  setIsPending?: any;
}) {
  value?.setIsPending && value?.setIsPending(true);

  const data = value?.allowMulti
    ? appendDataToFormData(value?.body)
    : value?.body;
  try {
    const res = await mutateData({
      method: value?.method,
      url: value?.url,
      body: data,
      revalidatePage: !value?.tags && value?.path ? value?.path : "",
      ...(value?.tags ? { revalidateTags: value?.tags } : {}),
      ...(value?.allowMulti ? { allowMulti: value?.allowMulti } : {}),
    });
    if (res?.status === 200) {
      value?.onSuccess && value.onSuccess(res);
      // notification.success({
      //   message: res?.message,
      //   duration: 3,
      // });
      value?.sendTo && value?.router.replace(value?.sendTo);
    } else {
      // notification.error({
      //   message: res?.message,
      //   duration: 3,
      // });
    }

    return res;
  } catch (error) {
    throw error;
  } finally {
    value?.setIsPending && value?.setIsPending(false);
  }
}
export const useMutate = () => {
  const path = usePathname();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function MutateFunc(value: {
    url: string;
    method: "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    sendTo?: string;
    noLoader?: boolean;
    noPopup?: boolean;
    tags?: string | string[];
    allowMulti?: boolean;
    onSuccess?: any;
  }) {
    setIsPending(true);

    const data = value?.allowMulti
      ? appendDataToFormData(value?.body)
      : value?.body;

    try {
      const res = await mutateData({
        method: value?.method,
        url: value?.url,
        body: data,
        revalidatePage: !value?.tags ? path : "",
        ...(value?.tags ? { revalidateTags: value?.tags } : {}),
        ...(value?.allowMulti ? { allowMulti: value?.allowMulti } : {}),
      });
      if (res?.status === 200) {
        value?.onSuccess && value.onSuccess(res);
        toast.success(res?.message);
        value?.sendTo && router.replace(value?.sendTo);
      } else if (res?.statusCode === 401) {
        await removeCookie("user");
        await removeCookie("token");
        router.push("/login");
        toast.error("Your Session is expired now. Please login again.");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
      return res;
    } catch (error: any) {
      toast.error(error.data.response?.message || "Something went wrong");
      throw error;
    } finally {
      setIsPending(false);
    }
  }
  return { MutateFunc, isPending };
};

export const useQuery = ({ url, key }: QueryProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getServerSideDataWithFeatures({ url, key }); // Replace with your API endpoint
        setData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, key]);

  return { isLoading, error, data };
};

export const useSearchParamsQueries = () => {
  const searchParams = useSearchParams();
  return Array.from(searchParams.entries())
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};
