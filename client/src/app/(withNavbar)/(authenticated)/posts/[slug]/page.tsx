import { Separator } from "@/components/ui/separator";
import { TitleWrapper } from "@/components/atoms";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
} from "lucide-react";

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
        <div className="flex justify-between">
          <p className="text-gray-500 mt-2">
            {new Intl.DateTimeFormat("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(selectedPost.createdAt ?? ""))}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-muted-foreground">Share this post:</span>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                process.env.BASE_URL + "/posts/" + selectedPost?.id
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 hover:text-blue-600" />
            </Link>

            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                process.env.BASE_URL + "/posts/" + selectedPost?.id
              )}&text=${encodeURIComponent(selectedPost.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/icons/x-social.svg"}
                width={20}
                height={20}
                alt="twitter"
                className="w-5 h-5 hover:text-blue-400" 
              />
              {/* <Twitter className="w-5 h-5 hover:text-blue-400" /> */}
            </Link>

            <Link
              href={`https://wa.me/?text=${encodeURIComponent(
                selectedPost.title +
                  " " +
                  process.env.BASE_URL +
                  "/posts/" +
                  selectedPost?.id
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 hover:text-green-500" />
            </Link>

            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                process.env.BASE_URL + "/posts/" + selectedPost?.id
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 hover:text-blue-700" />
            </Link>
          </div>
        </div>
        <Separator className="my-4" />
        {selectedPost?.image ? (
          <Image
            src={
              selectedPost?.image
                ? process.env.BASE_URL + selectedPost?.image
                : "/images/no-image.png"
            }
            width={1000}
            height={500}
            alt={selectedPost.title}
            className="w-full max-h-[500px] object-cover border-1 border-solid rounded-2xl mb-4"
          />
        ) : (
          <></>
        )}
        <div dangerouslySetInnerHTML={{ __html: selectedPost.body }} />
      </div>
    </TitleWrapper>
  );
}
