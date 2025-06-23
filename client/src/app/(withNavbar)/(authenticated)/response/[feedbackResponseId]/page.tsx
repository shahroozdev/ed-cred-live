import { TitleWrapper } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import GroupedResponseView from "@/components/pages/user/review/groupReview";


export default async function FeedbackResponseViewPage({
  params,
}: {
  params: Promise<{ feedbackResponseId: string }>;
}) {
  const { feedbackResponseId } = await params;
  const data = await getServerSideDataWithFeatures({
    url: `/school/employee/${feedbackResponseId}`,
    key: "singleResponse",
  });
  return (
    <>
      <TitleWrapper title={data?.responses[0]?.feedbackForm?.title} notBackBtn>
        <GroupedResponseView data={data} />
      </TitleWrapper>
    </>
  );
}
