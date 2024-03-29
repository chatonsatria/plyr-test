import { useEffect, useRef } from "react";

// import "plyr-react/dist/plyr.css";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";

const VideoPlayer = () => {
  const ref = useRef<APITypes>(null);
  useEffect(() => {
    const loadVideo = async () => {
      const video = document.getElementById("plyr") as HTMLVideoElement;
      var hls = new Hls();
      hls.loadSource("https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8");
      hls.attachMedia(video);
      // @ts-ignore
      ref.current!.plyr.media = video;

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        (ref.current!.plyr as PlyrInstance).play();
      });
    };
    loadVideo();
  });

  return (
    <Plyr
      id="plyr"
      options={{ volume: 0.1 }}
      source={{} as PlyrProps["source"]}
      ref={ref}
    />
  );
};

export default function VideoPlyr2() {
  const supported = Hls.isSupported();

  return (
    <div>
      {supported ? <VideoPlayer /> : "HLS is not supported in your browser"}
    </div>
  );
}
