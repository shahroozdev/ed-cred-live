"use client";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

const ProgressProvider = () => {
  const pathname = usePathname();
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.1,
  });
  useEffect(() => {
    NProgress.done();
  }, [pathname]);
  return null;
};

export default ProgressProvider;
