import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-6 md:px-12 bg-muted/30 dark:bg-muted/10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center max-w-4xl mx-auto">
          {/* Photo column */}
          <div
            className={cn(
              "w-full md:w-1/3 flex flex-col items-center",
              isVisible ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000"
            )}
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-4">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-teal-300 animate-float"></div>
              <div className="absolute inset-[3px] rounded-full bg-card flex items-center justify-center overflow-hidden">
                <img
                  src="/nam_dp.jpg"
                  alt="Namrath Measala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Resume Button */}
            <a
              href="Nam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-transparent bg-portfolio-background border-2 border-white rounded-lg shadow-md transition-all duration-300 hover:shadow-[0_0_10px_3px_rgba(255,215,0,0.6)] hover:scale-105 bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text"
            >
              My Resume
            </a>
          </div>

          {/* Text column */}
          <div
            className={cn(
              "w-full md:w-2/3",
              isVisible ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000 delay-300"
            )}
          >
            <p className="text-lg mb-4">
              I'm a Full Stack Developer, 
              <span className="text-transparent bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text">
                Web3 Enthusiast
              </span>, and UI/UX Designer focused on building efficient, scalable, and user-centric digital experiences. I enjoy working across the stack, from designing intuitive interfaces to developing robust backend systems, to bring thoughtful and impactful projects to life.
            </p>
            <p className="text-lg mb-4">
              My work spans a variety of projects, including Web3 wallet generators and AI-powered finance apps, where I aim to blend clean design with reliable functionality.
            </p>
            <p className="text-lg mb-4">
              <span className="text-transparent bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text">
                Beyond Code
              </span>, I’m a member of DOT – The Design Club of IIITV, with recognition in design and project innovation.
            </p>
            <p className="text-lg">
              <span className="text-transparent bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text">
                AFK
              </span>, you’ll often find me enjoying a game of cricket, thinking a few moves ahead in chess, or rallying through a round of table tennis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
