"use client";
import { SafariContext } from "@/hooks/generalHooks";
import { usePRouter } from "@/hooks/useRouter";
import { ReactNode, useEffect, useState} from "react";

const BrowserDetect = ({children}: {children: ReactNode}) => {
  const router = usePRouter();
  const [safari, setSafari] = useState(false);

  useEffect(() => {
    const browserDetect = () => {
      function detectBrowser() {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
          setSafari(true);
          return "Apple Safari";
        }
        return "Other";
      }
      const browserName = detectBrowser();
      if (browserName === "Apple Safari") {
        const metaTag1 = document.createElement("meta");
        metaTag1.name = "viewport";
        metaTag1.content = "width=device-width, initial-scale=1, maximum-scale=1,user-scalable=no, shrink-to-fit=no";
        document.head.appendChild(metaTag1);
      }
    };
    browserDetect();
  }, [router]);
  return <SafariContext.Provider value={safari}>{children}</SafariContext.Provider>;
};

export default BrowserDetect;
