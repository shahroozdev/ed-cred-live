import FetchOnServer from "@/lib/FetchOnServerSide";
import { Loader2 } from "lucide-react";
import React, { ReactNode, Suspense } from "react";

const FetchWithSuspension = ({
  suspension,
  children,
  apiData,
  getProfile,
  cookie,
  searchParams,
  params
}: {
  suspension?: ReactNode;
  children: (
    data: any,
    profile: Record<string, any>,
    cookies?: any
  ) => ReactNode;
  apiData?:
    | { url: string; key?: string | string[], noParams?:boolean, noSearParams?:boolean, noCookie?:boolean  }
    | { url?: string; key?: string | string[], noParams?:boolean, noSearParams?:boolean, noCookie?:boolean }[];
  getProfile?: boolean;
  cookie?: { name: string; default?: any; key?: string };
  searchParams?: any;
  params?: { slugs: any; key: string | string[]; type: "link" | "params" };
}) => {
  return (
    <Suspense fallback={suspension || <Loader2 />}>
      <FetchOnServer apiData={apiData} getProfile={getProfile} cookie={cookie} searchParams={searchParams} params={params}>
        {(data, profile, cookies) => children(data, profile, cookies)}
      </FetchOnServer>
    </Suspense>
  );
};

export default FetchWithSuspension;
