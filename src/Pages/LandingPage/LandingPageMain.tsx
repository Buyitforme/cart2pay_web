import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Nav from "../../Components/Nav";
import HeroSection from "./HeroSection";
import StoreMarquee from "./StoreMarquee";
import Cart2payEssentials from "./Cart2payEssentials";
import Footer from "../../Components/Footer";
import { ReactNode } from "react";
import Faq from "./FAQ";
import ThirstTraps from "./ThirstTraps";

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
interface AnimatedSectionProps {
  children: ReactNode;
}
const LandingPageMain = () => {
  return (
    <>
      <div className="px-5 md:px-20">
        <AnimatedSection>
          <Nav />
        </AnimatedSection>
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
        <ThirstTraps />
        <Faq />
      </AnimatedSection>

      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  );
};

const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
  });

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
