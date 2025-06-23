import { Separator } from "@/components/ui/separator";
import { TitleWrapper } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getServerSideDataWithFeatures({
    url: `/posts/${slug}`,
    key: "post",
  });

  if (!data) return <div className="text-center p-4">Post not found.</div>;
  const selectedPost = data;

  return (
    <TitleWrapper title="Post Detail" notBackBtn>
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold">{selectedPost.title}</h1>
        <p className="text-gray-500 mt-2">
          {new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(selectedPost.createdAt ?? ""))}
        </p>
        <Separator className="my-4" />
        <Image
          src={
            selectedPost?.image
              ? process.env.BASE_URL + selectedPost?.image
              : "/images/no-image.png"
          }
          width={1000}
          height={500}
          alt={selectedPost.title}
          className="w-full max-h-[500px] object-cover rounded-2xl mb-4"
        />
        <div dangerouslySetInnerHTML={{ __html: selectedPost.body }} />
      </div>
    </TitleWrapper>
  );
}
