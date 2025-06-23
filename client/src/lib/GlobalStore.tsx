"use client";
import { GlobalStore } from "@/hooks/generalHooks";
import React, { ReactNode } from "react";

const GlobalStoreProvider = ({
  children,
  categories,
  schools,
}: {
  children: ReactNode;
  categories: Record<string, any>;
  schools: Record<string, any>;
}) => {
  return (
    <GlobalStore.Provider value={[categories, schools]}>
      {children}
    </GlobalStore.Provider>
  );
};

export default GlobalStoreProvider;
