
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6",
        isScrolled
          ? "glassmorphism md:px-12"
          : "bg-transparent md:py-6 md:px-12"
      )}
    >
      <div className="container flex items-center justify-between mx-auto">
        <a
          href="#"
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <img
            src="/MN_logo.png"
            alt="MN Logo"
            className="h-10 w-10 rounded-full object-cover hover:opacity-80 transition-opacity"
          />
        </a>
        <nav className="hidden md:flex space-x-1">
          {["About", "Projects", "Experience", "Skills", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium rounded-full transition-colors hover:text-primary"
              >
                {item}
              </a>
            )
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full font-medium text-sm transition-all"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}
