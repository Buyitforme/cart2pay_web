import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./HeroSection";
import StoreMarquee from "./StoreMarquee";
import Cart2payEssentials from "./Cart2payEssentials";
import Faq from "./FAQ";
import ThirstTraps from "./WhyChooseUs";
import TestimonialSection from "./Testimonials";
import { ReactNode, useEffect, useRef } from "react";
import React from "react";
import HowItWorks from "./HowItWorks";

const variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.98,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

interface AnimatedSectionProps {
  children: ReactNode;
}

const LandingPageMain = () => {
  const storeMarqueeRef = useRef<HTMLDivElement>(null);

  const scrollToStoreMarquee = () => {
    storeMarqueeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <AnimatedSection>
        <HeroSection onExploreClick={scrollToStoreMarquee} />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection ref={storeMarqueeRef}>
        <StoreMarquee />
      </AnimatedSection>

      <AnimatedSection>
        <Cart2payEssentials />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialSection onExploreClick={scrollToStoreMarquee} />
      </AnimatedSection>
      <AnimatedSection>
        <ThirstTraps />
      </AnimatedSection>
      <AnimatedSection>
        <Faq />
      </AnimatedSection>
    </>
  );
};

// ✅ Modern AnimatedSection with pre-trigger + refined motion
export const AnimatedSection = React.forwardRef<
  HTMLDivElement,
  AnimatedSectionProps
>(({ children }, forwardedRef) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    rootMargin: "200px 0px", // starts animating before entering view
    triggerOnce: true, // prevents re-triggering
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={(node) => {
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
});

export default LandingPageMain;
