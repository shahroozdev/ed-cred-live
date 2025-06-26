import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import UsersPageComponent from "@/components/pages/admin/users";

const UsersPage = async () => {
  const users:any = await getServerSideDataWithFeatures({
    url: "/auth/users",
    key: "usersList",
  });
  return (
    <TitleWrapper title="Users Listing">
      <UsersPageComponent users={users} />
    </TitleWrapper>
  );
};

export default UsersPage;
