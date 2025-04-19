"use client";
import { Player } from "@lottiefiles/react-lottie-player";

export default function WebDevLottie({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
    >
      <Player
        autoplay
        loop
        src="https://lottie.host/7b8c1a4b-3a4c-4a9c-9e0b-2d6d8d9b8c2b/8A4n9Q8q2l.json"
        style={{ width: "100%", height: "100%", minHeight: 200 }}
      />
    </div>
  );
}
