import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./HeroSection";
import StoreMarquee from "./StoreMarquee";
import Cart2payEssentials from "./Cart2payEssentials";
import Faq from "./FAQ";
import ThirstTraps from "./ThirstTraps";
import TestimonialSection from "./Testimonials";
import { ReactNode, useRef } from "react";
import MainLayout from "../../Components/MainLayout";
import React from "react";

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AnimatedSectionProps {
  children: ReactNode;
}

const LandingPageMain = () => {
  // Create ref for the StoreMarquee section
  const storeMarqueeRef = useRef<HTMLDivElement>(null);

  // Function to scroll to StoreMarquee
  const scrollToStoreMarquee = () => {
    storeMarqueeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="px-5 md:px-20">
        <AnimatedSection>
          <HeroSection onExploreClick={scrollToStoreMarquee} />
        </AnimatedSection>
      </div>

      <AnimatedSection ref={storeMarqueeRef}>
        <StoreMarquee />
      </AnimatedSection>

      <AnimatedSection>
        <Cart2payEssentials />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialSection onExploreClick={scrollToStoreMarquee} />
        <ThirstTraps onExploreClick={scrollToStoreMarquee} />
        <Faq />
      </AnimatedSection>
    </>
  );
};

const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children }, forwardedRef) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2 });

    if (inView) {
      controls.start("visible");
    }

    return (
      <motion.div
        ref={(node) => {
          // Handle both refs - intersection observer and forwarded ref
          ref(node);
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        animate={controls}
        initial="hidden"
        variants={variants}
      >
        {children}
      </motion.div>
    );
  }
);

export default LandingPageMain;
