import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { TitleWrapper } from "@/components/atoms";
import ForumDetailComponent from "@/components/pages/admin/forum/detail";




export default async function PostPage({params}: {params: Promise<{ id: string }>}) {
  const {id} = await params;
  const question = await getServerSideDataWithFeatures({url:`/forum-question/${id}`, key:'forumDetail'})
    console.log(question)
  return (
    <TitleWrapper title={"Form Detail"}>
        <ForumDetailComponent question={question}/>
      {/* <div className="max-w-2xl mx-auto mt-10">
        <div className="w-full min-h-[400px] h-[400px] max-h-[400px]">
          <Image
            src={"/images/no-image.png"}
            width={500}
            height={200}
            alt={question?.title || ""}
            className="w-full h-full rounded-3xl"
            onError={(event: any) => {
              event.target.srcset = "/images/no-image.png";
            }}
          />
        </div>
        <div className="font-semibold text-3xl">{question?.title}</div>
        <div className="mt-2">{question?.text}</div>
        <Separator className="my-4" />
        <div className="flex w-full justify-between">
          <div className="text-muted-foreground line-clamp-1 text-base">
            asked by{" "}
            <span className="font-semibold">{question?.author.username}</span>{" "}
            on{" "}
            <span className="font-semibold lowercase">
              {new Intl.DateTimeFormat("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(question?.createdAt ?? new Date()))}
            </span>
          </div>
          <div className="flex gap-2 self-end">
            <ThumbsDownIcon strokeWidth={1} className="hover:text-red-500" />
            <ThumbsUpIcon strokeWidth={1} className="hover:text-blue-500" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {question?.replies.map((reply) => (
            <div
              className="flex flex-col gap-0 p-4 outline outline-muted rounded-md"
              key={reply.id}
            >
              <div className="flex gap-4 items-center">
                <Avatar className="self-start">
                  <AvatarFallback>
                    {reply.author.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {reply.text}
              </div>
              <span className="font-semibold lowercase text-muted-foreground text-sm self-end">
                {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(reply.createdAt ?? new Date()))}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-20 gap-2">
          <textarea
            className="outline-muted focus:bg-muted focus:outline-muted-foreground h-28 rounded-md px-3 py-2 text-base outline-2"
            placeholder="answer the question"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            minLength={5}
          />
          <div className="self-end" onClick={reply}>
            <Button disabled={answer === ""}>answer</Button>
          </div>
        </div>
      </div> */}
    </TitleWrapper>
  );
}
