import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Calendar } from "lucide-react"; 

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // States to hold Calendly colors based on theme
  const [calendlyBgColor, setCalendlyBgColor] = useState('FFFFFF'); // Default to white for light mode
  const [calendlyTextColor, setCalendlyTextColor] = useState('000000'); // Default to black for light mode

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

  // Effect to detect theme and update Calendly colors
  useEffect(() => {
    const updateCalendlyTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
      setCalendlyBgColor(isDarkMode ? '0C1322' : 'FFFFFF');
      setCalendlyTextColor(isDarkMode ? 'FFFFFF' : '000000');
    };

    // Update theme on mount
    updateCalendlyTheme();

    // Listen for theme changes on both html and body elements
    const htmlObserver = new MutationObserver(updateCalendlyTheme);
    htmlObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const bodyObserver = new MutationObserver(updateCalendlyTheme);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      htmlObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Dynamically load Calendly script and update data-url when visible or colors change
  useEffect(() => {
    // Only load if visible and container is ready
    if (!isVisible || !widgetContainerRef.current) {
        // Clean up if no longer visible or container gone
        while (widgetContainerRef.current?.firstChild) {
            widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
        }
        return;
    }

    // Clear existing widget content before adding the new one
    while (widgetContainerRef.current.firstChild) {
        widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
    }

    // Construct the Calendly URL with dynamic background and text colors
    const calendlyUrl = `https://calendly.com/measalanamrath?background_color=${calendlyBgColor}&text_color=${calendlyTextColor}&primary_color=007AFF`;

    // Set the data-url attribute on the container
    widgetContainerRef.current.setAttribute('data-url', calendlyUrl);

    // Create and append the new script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    widgetContainerRef.current.appendChild(script);

    // Cleanup function to remove the script and content
    return () => {
        while (widgetContainerRef.current?.firstChild) {
            widgetContainerRef.current.removeChild(widgetContainerRef.current.firstChild);
        }
    };

  }, [isVisible, calendlyBgColor, calendlyTextColor]); // Re-run this effect if visibility or colors change

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 md:px-12 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-2">
          Have a project in mind or want to chat? Let's schedule a meeting!
        </p>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <a
            href="mailto:measalanamrath@gmail.com"
            className="text-primary underline transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:bg-clip-text hover:text-transparent hover:opacity-80"
            style={{ textUnderlineOffset: "4px" }}
          >
            measalanamrath@gmail.com
          </a>
        </p>

        {/* Calendly Inline Widget */}
        <div className={cn(
          "transition-all duration-700 delay-300 max-w-3xl mx-auto",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="bg-card rounded-2xl p-6 border shadow-sm transition-all duration-500 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.4)] hover:ring-1 hover:ring-blue-400">
            <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Schedule a Meeting
            </h3>
            <div 
              ref={widgetContainerRef}
              className="calendly-inline-widget" 
              // data-url is set dynamically in the effect below
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
