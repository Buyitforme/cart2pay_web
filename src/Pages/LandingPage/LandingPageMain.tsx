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
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
    window.scrollTo({ top: 0, behavior: "auto" }); // or "smooth" if you prefer
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
        <div></div>
        <TestimonialSection onExploreClick={scrollToStoreMarquee} />
        <ThirstTraps  />
        <Faq />
      </AnimatedSection>
    </>
  );
};

export const AnimatedSection = React.forwardRef<
  HTMLDivElement,
  AnimatedSectionProps
>(({ children }, forwardedRef) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  if (inView) {
    controls.start("visible");
  }

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
