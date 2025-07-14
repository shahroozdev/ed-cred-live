import PackageCard from "./components/packageCard";

const BillingComponent =  ({data}:{data:Record<string, any>}) => {

  return (
    <>
      {data?.map((plan: Record<string, any>, i: number) => (
        <PackageCard plan={plan} key={i} />
      ))}
    </>
  );
};

export default BillingComponent;
