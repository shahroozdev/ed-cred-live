// components/FetchWithSuspension.tsx

import {
  getCookie,
  getServerSideDataWithFeatures,
} from "@/actions/serverActions";
import { ReactNode } from "react";
import { getStaticPropsData } from "./StaticPropsFetch";

// Define children as a render function
const FetchOnServer = async ({
  children,
  apiData,
  getProfile = false,
  cookie,
  searchParams,
  params,
}: {
  children: (data: any, profile: any, cookies?: any) => ReactNode;
  apiData?:
    | {
        url: string;
        key?: string | string[];
        noParams?: boolean;
        noSearParams?: boolean;
        noCookie?: boolean;
      }
    | {
        url?: string;
        key?: string | string[];
        noParams?: boolean;
        noSearParams?: boolean;
        noCookie?: boolean;
      }[];
  getProfile?: boolean;
  cookie?: { name: string; default?: any; key?: string, type?: "link" | "params", paramKey?:string  };
  searchParams?: any;
  params?: { slugs: any; key: string | string[]; type: "link" | "params" };
}) => {
  const slugs = await params?.slugs;
  const parameters = await searchParams;
  const queryParams = new URLSearchParams(parameters);
  const cookies =
    (cookie && (await getCookie(cookie?.name))) ?? cookie?.default;
  let path = "";

  if (Array.isArray(params?.key)) {
    // Build URL path from multiple keys
    path = params.key
      .map((k) => slugs?.[k]) // get slugs for each key
      .filter(Boolean) // remove undefined/null
      .join("/"); // join into URL path
  } else if (typeof params?.key === "string") {
    path = slugs?.[params.key] || "";
  }
const cookietype = cookie?.type ? (cookie?.type==="params"?"?"+cookie?.paramKey:"/"):""
  const data = apiData
    ? Array.isArray(apiData)
      ? await Promise.all(
          apiData.map((api) =>
            getServerSideDataWithFeatures({
              url:
                (api?.url || "") +
                (!api?.noParams && path
                  ? (params?.type === "link" ? "/" : "?") + path
                  : "") +
                (!api?.noCookie && cookie && cookies
                  ? cookie?.key
                    ?cookietype+cookies[cookie?.key || ""]
                    : cookietype+cookie
                  : "") +
                (!api?.noSearParams && searchParams ? "?" + queryParams : ""),
              key: api?.key,
            })
          )
        )
      : await getServerSideDataWithFeatures({
          url:
            apiData?.url +
            (path ? (params?.type === "link" ? "/" : "?") + path : "") +
            (cookie && cookies
              ? cookie?.key
                ? cookies[cookie?.key || ""]
                : cookie
              : "") +
            (searchParams ? "?" + queryParams : ""),
          key: apiData?.key,
        })
    : [];

  const { profile } = getProfile
    ? await getStaticPropsData()
    : { profile: null };

  return <>{children(data, profile?.data, cookies)}</>;
};

export default FetchOnServer;
