import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import { AskQuestionCard } from "@/components/pages/common/Forum/AskQuestionCard";
import ViewALLForums from "@/components/pages/admin/forum/viewAll";


const ForumPage = async () => {
  const data = await getServerSideDataWithFeatures({
    url: "/forum-question",
    key: "forumList",
  });
  return (
    <TitleWrapper title="All Forums">
      <AskQuestionCard />
      <ViewALLForums data={data} />
    </TitleWrapper>
  );
};

export default ForumPage;
