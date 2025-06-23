import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "./HeroSection";
import StoreMarquee from "./StoreMarquee";
import Cart2payEssentials from "./Cart2payEssentials";
import Faq from "./FAQ";
import ThirstTraps from "./ThirstTraps";
import TestimonialSection from "./Testimonials";
import { ReactNode } from "react";
import MainLayout from "../../Components/MainLayout";

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface AnimatedSectionProps {
  children: ReactNode;
}

const LandingPageMain = () => {
  return (
    // <MainLayout>
    <>
      <div className="px-5 md:px-20">
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <StoreMarquee />
      </AnimatedSection>

      <AnimatedSection>
        <Cart2payEssentials />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialSection />
        <ThirstTraps />
        <Faq />
      </AnimatedSection>
    </>
    // </MainLayout>
  );
};

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  if (inView) {
    controls.start("visible");
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default LandingPageMain;
