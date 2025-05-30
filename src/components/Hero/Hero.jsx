import { useRef, useState } from "react";

export default function Hero() {
  // current video index state
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  // is loading state
  const [isLoading, setIsLoading] = useState(true);
  // number of loaded videos state
  const [loadedVideos, setLoadedVideos] = useState(0);
  // number of total videos we want to play
  const totalVideos = 4;
  // if next video index reaches the number of total videos then we will set upcoming video index to 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  // next target video reference(target dom element)
  const nextVideoRef = useRef(null);

  // function to handle loaded video
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // mini video play click handler
  const handleMiniVideoClick = () => {
    setHasClicked(true);

    // change current video index
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // get video source
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* main video frame */}
      <div
        id="video-frame"
        className="z-10 relative h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* mini video player mask */}
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                autoPlay
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                // special handler to call a function once data loads
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          {/* primary video player */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className="absolute absolute-center invisible z-20 size-64 object-cover object-center"
            id="next-video"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        {/* texts */}
        <h1 className="hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<span className="special-font">a</span>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="hero-heading text-blue-100">
              Redefi<span className="special-font">n</span>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame
              <br />
              Unleash the Play Economy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
