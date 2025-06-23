import { useNavigate } from "react-router-dom";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";
import StoryImage from "../Assets/svg_images/happy_ladies.jpg"; 
import TestimonialSection from "./LandingPage/Testimonials";
import MainLayout from "../Components/MainLayout";
import { ImageRenderer } from "../Components/ImageRenderer";

const ShareStoryLanding = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <MainLayout> */}
        <div className="min-h-screen w-full bg-[#F3F4F6] px-6 pt-20 flex justify-center">
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Text Content */}
            <div className="space-y-6 mt-0 md:mt-12 lg:mt-24">
              {" "}
              {/* Pushes it slightly lower than the image */}
              <div>
                <Heading size="3xl" weight="bold" className="text-[#1E2A47]">
                  Our Customers
                </Heading>
                <div className="flex items-center gap-2">
                  <Heading size="3xl" weight="bold" className="text-[#1E2A47]">
                    Love Us!
                  </Heading>
                  <span className="text-5xl animate-zoom">🫶🏾</span>
                </div>
              </div>
              <Text size="md" color="subtle">
                Stories from satisfied customers who’ve successfully paid for
                the items they purchased from stores like{" "}
                <span className="font-semibold text-[#1E2A47]">
                  Shein, Zara, Fashion Nova
                </span>
                , and more — all using our platform.
                <br />
                <br />
                And guess what?{" "}
                <span className="font-medium text-[#1E2A47]">
                  We’d love to hear yours too.
                </span>
              </Text>
              <Button
                variant="primary"
                onClick={() => {
                  localStorage.setItem("redirectAfterLogin", "share-story");
                  navigate("/signin", { state: { from: "/share-your-story" } });
                }}
              >
                Share Your Story
              </Button>
            </div>

            {/* Right Image */}
            <div className="w-full h-full">
              <ImageRenderer
                src={StoryImage}
                alt="Story illustration"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
        <TestimonialSection />
      {/* </MainLayout> */}
    </>
  );
};

export default ShareStoryLanding;
