import VideoCard from "@/components/molecules/videoPlayerModal/videoCard";
import Image from "next/image";
import React from "react";
import { CustomAudioPlayer } from "../players/audioPlayer";

const DynamicView = ({ file }: { file: File }) => {
  const type = file?.type.split("/")[0];
  const extension = file?.name.split('.').pop()
  const blob = new Blob([file], { type: file.type });
  const blobUrl = URL.createObjectURL(blob);
  console.log(extension)
  return (
    <>
      {type === "video" ? (
        <VideoCard thumbnail={{ title: file?.name, videoUrl: blobUrl }} />
      ):type === "audio" ? ( <CustomAudioPlayer title={file?.name} url={blobUrl}/>
      ): (
        <div className="flex flex-col h-full w-full">
        <Image
          src={type === "application"?`/images/${extension}.png` :blobUrl}
          height={500}
          width={1000}
          className={`w-full h-full ${type === "application"?"":"object-cover rounded-md"}`}
          alt={file.name + " | ED-Cred"}
        />
        <div className={"text-black text-center my-2 text-xs"}>
          {file?.name.slice(0, 20) + "..."}
        </div>
        </div>
      )}
    </>
  );
};

export default DynamicView;
