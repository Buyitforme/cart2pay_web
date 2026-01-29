import { useEffect } from "react";
import { Heading, Text } from "../Components/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { data } from "./data";

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
useEffect(() => {
  if (location.hash && data.length > 0) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          const yOffset = -100; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }
}, [location]);
  return (
    <div className="min-h-screen bg-background pt-8">
      {/* Hero Section */}
      <div className="pt-20 pb-16 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center justify-center items-center">
      
          <Heading
            as="h1"
            size={{ sm: "xl", base: "xl", md: "2xl", lg: "3xl" }}
            weight="bold"
            className="mb-4"
          >
            Terms of <span className="">Service</span>
          </Heading>

          <Text size="sm" className="text-gray-400">
            Last Updated: October 19, 2025
          </Text>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-lg py-4">
            <div className="sticky top-24 space-y-2">
              {data.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-primary  rounded-lg transition-all duration-200"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {data.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 md:p-8 border border-white/10 hover:border-primary transition-all duration-300">
                  <Heading
                    as="h2"
                    size={{ sm: "lg", base: "lg", md: "2xl" }}
                    weight="bold"
                    className="mb-6 text-text-primary"
                  >
                    {section.title}
                  </Heading>

                  <div className="space-y-4">
                    {section.content.map((paragraph, index) => (
                      <Text
                        key={index}
                        size={{ base: "sm" }}
                        weight="normal"
                        className="text-text-secondary leading-relaxed"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
