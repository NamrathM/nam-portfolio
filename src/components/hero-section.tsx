import { useState, useEffect } from "react";
import { ChevronDown, ArrowUp } from "lucide-react"; // Import icons

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const titles = ["Full Stack Developer", "UI/UX Designer", "Web3 Enthusiast"];

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];

    // Typing effect
    if (!isDeleting && displayText !== currentTitle) {
      timer = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }
    // Pause at full word
    else if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    }
    // Deleting effect
    else if (isDeleting && displayText !== "") {
      timer = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1));
        setTypingSpeed(100);
      }, typingSpeed / 2);
    }
    // After deletion, move to next title
    else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex, typingSpeed, titles]);

  // Show "Go to Top" button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-background/0"></div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up-1"
            style={{ animationDelay: "0.2s" }}
          >
            Namrath <span className="text-gradient">Measala</span>
          </h1>

          <h2
            className="h-8 text-lg md:text-xl mb-6 text-muted-foreground opacity-0 animate-fade-in-up-2 overflow-hidden"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="inline-block">{displayText}</span>
          </h2>

          {/* Scroll Down Animation */}
          <div className="flex flex-col items-center mt-12 cursor-pointer" onClick={scrollToNextSection}>
            {/* Mouse Animation */}
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center items-start">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce mt-1"></div>
            </div>
            {/* Scroll Down Text */}
            <p className="mt-4 text-sm text-muted-foreground">Scroll Down</p>
          </div>
        </div>
      </div>

      {/* Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
}
