"use client";
import React, {useEffect, useState, useRef} from "react";
import { Pause, Play } from "lucide-react";

interface Props {
  url: string;
  title: string;
  fullWidth?: boolean;
  customWidth?: string;
  disabled?: boolean;
}
export const CustomAudioPlayer = ({url, title, fullWidth, customWidth, disabled}: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationAudio, setDurationAudio] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef = useRef<any>(null);
  useEffect(() => {
    audioRef.current = new Audio(url);
    return () => {
      audioRef.current.pause();
    };
  }, [url]);
  useEffect(() => {
    audioRef?.current?.addEventListener("loadedmetadata", () => {
      setDurationAudio(audioRef?.current?.duration / 60);
    });
    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef?.current?.currentTime / 60);
    });
  });
  const togglePlay = () => {
    if (!disabled) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className={`rounded-2xl bg-gradient-to-r from-[#f0f0f0] to-[#f1eded] w-full p-4 shadow-lg`}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div
            onClick={togglePlay}
            className={'flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all cursor-pointer text-[#5568a8] hover:text-[#4557a0] w-12 min-w-12 max-w-12 h-12'}
            style={disabled ? {opacity: 0.7, cursor: "not-allowed"} : {}}
            title={disabled ? "This is Paid item. Please add this item to your cart and complete the purchase to access its content." : ""}
          >
            {isPlaying && currentTime !== durationAudio ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium text-[#4e5156] truncate">{title}</div>
            <div className="text-xs text-[#6b6e76] mt-1">{(currentTime * 60).toFixed(0)}s / {(durationAudio * 60).toFixed(0)}s</div>
          </div>
        </div>
        
        <div className="relative w-full h-2 bg-[#d8e6f1] rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#5568a8] to-[#4557a0] rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / durationAudio) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
