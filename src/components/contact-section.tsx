import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react"; 

export function ContactSection() {
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
    <section id="contact" ref={sectionRef} className="py-20 px-6 md:px-12 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-2">
          Have a project in mind or want to chat? Feel free to reach out!
        </p>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-primary" /> {/* Mail icon */}
          <a
            href="mailto:measalanamrath@gmail.com"
            className="text-primary underline transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:bg-clip-text hover:text-transparent hover:opacity-80"
            style={{ textUnderlineOffset: "4px" }}
          >
            measalanamrath@gmail.com
          </a>
        </p>

        {/* Centered Contact Form */}
        <div className={cn(
          "transition-all duration-700 delay-300 max-w-md mx-auto", // Center the form
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="bg-card rounded-2xl p-6 border shadow-sm transition-all duration-500 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.4)] hover:ring-1 hover:ring-blue-400">
            <h3 className="text-xl font-semibold mb-6 text-center">Send a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}