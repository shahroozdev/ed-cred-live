'use client'
// import {LoadingOutlined} from "@ant-design/icons";
import {Player, ControlBar, PlayerReference} from "video-react";
import "video-react/dist/video-react.css";
import { Loader2 } from "lucide-react";

interface Props {
  videoUrl: string;
  videoTitle: string | undefined;
  playerRef: React.RefObject<PlayerReference>;
}
export const VideoPlayer = ({videoUrl, videoTitle, playerRef}: Props) => {
  return (
    <div>
      {videoUrl ? (
        <div className="">
          <Player ref={playerRef} src={videoUrl} preload="auto">
            <ControlBar autoHide={false} className="my-class" />
          </Player>
        </div>
      ) : (
        <div className={'bg-[#121212] px-[20%] py-0'}>
          <Loader2/>
        </div>
      )}
    </div>
  );
};
