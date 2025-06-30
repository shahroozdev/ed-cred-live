import { TitleWrapper } from "@/components/atoms";
import CreateForum from "@/components/pages/admin/forum/create";

export default function CreateForumQuestionPage() {

  return (
    <TitleWrapper
      title="Ask a Question"
      desc="Note that the questions you ask will be publically visible under your name! Kindly Don't ask irrelevant or inappropriate questions."
    >
      <CreateForum/>

    </TitleWrapper>
  );
}
