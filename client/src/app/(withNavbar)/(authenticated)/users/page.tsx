import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import UsersPageComponent from "@/components/pages/admin/users";

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams(params);
  const users: any = await getServerSideDataWithFeatures({
    url: `/auth/users?${queryParams.toString()}`,
    key: "usersList",
  });
  return (
    <TitleWrapper title="Users Listing">
      <UsersPageComponent users={users} />
    </TitleWrapper>
  );
};

export default UsersPage;
