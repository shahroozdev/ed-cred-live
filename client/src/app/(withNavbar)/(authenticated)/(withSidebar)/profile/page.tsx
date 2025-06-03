import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import ProfileComponent from "@/components/pages/common/profile";


const ProfilePage = async () => {
  const user = await getServerSideDataWithFeatures({
    url: "/auth/profile",
    key: "profile",
  });

  return (
    <TitleWrapper
      title="Profile"
      //  desc="Select the type of review you will submit"
      notBackBtn
    >
      <ProfileComponent user={user} />
    </TitleWrapper>
  );
};

export default ProfilePage;
