import React, { useState } from "react";
import { PlayCircle } from "lucide-react";
// import demoVideo from "../assets/demo-video.mp4"; // Replace with your video
import { Heading ,Text} from "../Components/Typography";
import previewImage from "../Assets/svg_images/happy girl.jpg";
import Nav from "../Components/Nav";


const HowItWorks: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Nav />
      <section className=" px-6 bg-white relative bg-background">
        <div className="max-w-5xl mx-auto text-center py-4">
          <Heading size="2xl" weight="bold" className="mb-2">
            How It Works
          </Heading>
          <Text
            size="md"
            color="subtle"
            className="mb-4 text-center max-w-4xl mx-auto leading-7 tracking-wide"
          >
            Watch this quick 1-minute guide on how to seamlessly transfer your
            cart items from any international store to our platform and make payment with your local card.
          </Text>

          {/* Video Preview Area */}
          <div className="relative w-full max-w-3xl mx-auto cursor-pointer">
            <img
              src={previewImage}
              alt="How it works"
              className="rounded-xl shadow-lg w-full object-cover"
              onClick={() => setIsPlaying(true)}
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl hover:bg-black/60 transition"
              onClick={() => setIsPlaying(true)}
            >
              <PlayCircle className="text-white w-16 h-16 drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* Video Modal Overlay */}
        {isPlaying && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
            <div className="w-[90%] max-w-4xl">
              <video
                src="demovideo.mp4"
                controls
                autoPlay
                className="w-full rounded-xl shadow-lg"
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="mt-4 text-white text-sm hover:underline block text-center"
              >
                Close Video
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default HowItWorks;
