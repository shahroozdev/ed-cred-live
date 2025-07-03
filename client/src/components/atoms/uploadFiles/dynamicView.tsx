import VideoCard from "@/components/molecules/videoPlayerModal/videoCard";
import Image from "next/image";
import React from "react";
import { CustomAudioPlayer } from "../players/audioPlayer";
import { typeOfFile } from "@/lib/utils";
import PLink from "@/components/atoms/link";

const DynamicView = ({ file, url }: { file?: File; url?: any }) => {
  const type = url
    ? typeOfFile(url.split(".").pop())
    : file?.type.split("/")[0];
  const extension = url ? url?.split(".")?.pop() : file?.name.split(".").pop();
  const title = url ? url : file?.name;
  const blob = file && new Blob([file], { type: file?.type });
  const blobUrl = url ? process.env.BASE_URL + url : URL.createObjectURL(blob!);

  return (
    <>
      {type === "video" ? (
        <VideoCard thumbnail={{ title, videoUrl: blobUrl }} />
      ) : type === "audio" ? (
        <CustomAudioPlayer title={title!} url={blobUrl} />
      ) : (
        <PLink href={url?blobUrl:'#'} className="flex flex-col h-full w-full">
          <Image
            src={type === "application" ? `/images/${extension}.png` : blobUrl}
            height={500}
            width={1000}
            className={`w-full h-full ${
              type === "application" ? "" : "object-cover rounded-md"
            }`}
            alt={title + " | ED-Cred"}
            onError={(event: any) => {
              event.target.srcset = "/images/no-image.png";
            }}
          />
          <div className={"text-black text-center my-2 text-xs"}>
            {"..."+title?.slice(-20) }
          </div>
        </PLink>
      )}
    </>
  );
};

export default DynamicView;
