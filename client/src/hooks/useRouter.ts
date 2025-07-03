"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useRouter } from "next/navigation";

export const usePRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  // const setLoader = useSetLoaderStatusHook();

  // Custom push
  const push = (url: string) => {
    if (url !== pathname) {
      NProgress.start();
      NProgress.set(0.1);
      router.push(url);
    }
  };

  // Custom replace
  const replace = (url: string) => {
    if (url !== pathname) {
      NProgress.start();
      NProgress.set(0.1);
      router.replace(url);
    }
  };

  // Custom back
  const back = () => {
    NProgress.start();
    NProgress.set(0.1);
    router.back();
  };

  // Custom refresh
  const refresh = () => {
    NProgress.start();
    NProgress.set(0.1);
    router.refresh();
  };

  return {
    push,
    replace,
    back,
    refresh,
  };
};
