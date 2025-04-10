import { cn } from "@/lib/utils";
import { CornerRightDown, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
  delay?: number;
  showDemo?: boolean;
}

export function ProjectCard({
  title,
  description,
  image,
  techStack,
  demoLink,
  githubLink,
  delay = 0,
  showDemo = true,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      ref={cardRef} 
      className={cn(
        "bg-card border rounded-2xl overflow-hidden transition-all duration-700 transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        isHovered ? "shadow-xl" : "shadow-md",
        isHovered && "border-primary/50"
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transitionProperty: "transform, opacity, translate, box-shadow",
        boxShadow: isHovered ? `0 0 20px 2px ${title === "Fintellect" ? "rgba(14, 165, 233, 0.3)" : "rgba(20, 184, 166, 0.3)"}` : "",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10",
          isHovered ? "opacity-30" : "opacity-0",
          "transition-opacity duration-300"
        )} />
        <img 
          src={image} 
          alt={title} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-110" : "scale-100"
          )} 
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span 
              key={tech} 
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          {demoLink && showDemo && (
            <Button asChild size="sm" variant="default">
              <a href={demoLink} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          
          {githubLink && (
            <Button asChild size="sm" variant="outline">
              <a href={githubLink} target="_blank" rel="noreferrer">
                <Github className="mr-1 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
