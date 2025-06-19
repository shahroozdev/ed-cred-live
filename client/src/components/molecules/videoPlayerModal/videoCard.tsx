"use client";
import { Play } from "lucide-react";
import React, { useRef, useState } from "react";
import { PlayerReference } from "video-react";
import PortalModal from "./modal";
import { VideoPlayer } from "@/components/atoms/players/videoPlayer";
import { useSafari } from "@/hooks/generalHooks";

const VideoCard = ({
  thumbnail,
  disabled,
  hidetitle,
  height,
  hideOptions,
}: {
  thumbnail: any;
  disabled?: boolean;
  hidetitle?: boolean;
  height?: string;
  hideOptions?: boolean;
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalVideo, setModalVideo] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const safari = useSafari();
  const playerRef = useRef<PlayerReference>(null);
  return (
    <div
      className={"relative h-[167.75px] w-full mb-5"}
      style={{
        height: !hideOptions ? "" : height ? 235 : 180,
        width: !hideOptions ? "" : "100%",
      }}
    >
      <video
        className={"rounded-xl !object-cover brightness-60 h-full w-full"}
        poster={safari ? thumbnail?.videoUrl : ""}
      >
        <source src={thumbnail?.videoUrl} />
      </video>
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpenModal(true);
            setModalVideo(thumbnail?.videoUrl);
            setVideoTitle(thumbnail?.title);
          }
        }}
        className={
          "absolute top-[40%] right-[50%] p-2 bg-white shadow-2xl cursor-pointer text-[#5568a8] rounded-full translate-x-1/2 -translate-y-1/2"
        }
        style={disabled ? { opacity: 70, cursor: "not-allowed" } : {}}
        title={
          disabled
            ? "This is Paid item. Please add this item to your cart and complete the purchase to access its content."
            : ""
        }
      >
        <Play size={18}/>
      </div>
      {!hidetitle && (
        <div className={"text-black text-center my-2 text-xs"}>
          {thumbnail?.title.slice(0, 20) + "..."}
        </div>
      )}
      <PortalModal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          playerRef.current && playerRef.current?.pause();
        }}
      >
        <VideoPlayer
          videoUrl={modalVideo}
          videoTitle={videoTitle}
          playerRef={playerRef as React.RefObject<PlayerReference>}
        />
      </PortalModal>
    </div>
  );
};

export default VideoCard;
