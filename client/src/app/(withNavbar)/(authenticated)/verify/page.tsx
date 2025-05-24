import { TitleWrapper } from "@/components/atoms";
import Verify from "@/components/pages/user/verify";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

const UserVerifyPage = async () => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profiel",
  });

  return (
    <TitleWrapper
      notBackBtn
      title={`Welcome, ${user?.name}!`}
      desc={`You selected the ${user?.category?.name} category. This category requires verification. Please choose one of the following options:`}
    >
      <Verify user={user} />
    </TitleWrapper>
  );
};

export default UserVerifyPage;
