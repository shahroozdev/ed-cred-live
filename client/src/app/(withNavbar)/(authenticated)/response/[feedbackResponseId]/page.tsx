import { TitleWrapper } from "@/components/atoms";
import { getCookie, getServerSideDataWithFeatures } from "@/actions/serverActions";
import GroupedResponseView from "@/components/pages/user/review/groupReview";


export default async function FeedbackResponseViewPage({
  params,
}: {
  params: Promise<{ feedbackResponseId: string }>;
}) {
  const { feedbackResponseId } = await params;
  const user:any = await getCookie('user')
  const data = await getServerSideDataWithFeatures({
    url: `/school/employee/${feedbackResponseId}?userId=${user?.id}`,
    key: "singleResponse",
  });
  const related = await getServerSideDataWithFeatures({
    url: `/school/branch?school=${data?.branch?.name}`,
    key: "RelatedReviews",
  });
  return (
    <>
      <TitleWrapper title={data?.responses?.[0]?.feedbackForm?.title||"Responses"} notBackBtn>
        <GroupedResponseView data={data} related={related} userId={user?.id}/>
      </TitleWrapper>
    </>
  );
}
