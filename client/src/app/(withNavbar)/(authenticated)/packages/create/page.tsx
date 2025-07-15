import { TitleWrapper } from "@/components/atoms";
import CreatePackageComponent from "@/components/pages/admin/package/create";
import React from "react";

const CreatePackage = () => {
  return (
    <TitleWrapper
      title="Add Package"
    >
      <CreatePackageComponent />
    </TitleWrapper>
  );
};

export default CreatePackage;
