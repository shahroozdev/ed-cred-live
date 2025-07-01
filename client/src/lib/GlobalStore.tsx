"use client";
import { GlobalStore } from "@/hooks/generalHooks";
import React, { ReactNode } from "react";

const GlobalStoreProvider = ({
  children,
  categories,
  subCategories,
  schools,
}: {
  children: ReactNode;
  categories: Record<string, any>;
  subCategories: Record<string, any>;
  schools: Record<string, any>;
}) => {
  return (
    <GlobalStore.Provider value={[categories, schools, subCategories]}>
      {children}
    </GlobalStore.Provider>
  );
};

export default GlobalStoreProvider;
