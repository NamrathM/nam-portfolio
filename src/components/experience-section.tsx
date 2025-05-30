
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { ExperienceCard } from "./experience-card";

export function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Show all items initially
    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        setVisibleItems((prev) => ({ ...prev, [index]: true }));
      }, index * 300);
    });
  }, []);

  return (
    <section
      id="experience"
      className="py-20 px-6 md:px-12 bg-muted/30 dark:bg-muted/10"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Work <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          My professional journey and the impactful roles I've undertaken.
        </p>

        <div className="max-w-5xl mx-auto">
          <Carousel 
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              <CarouselItem className="md:basis-full">
                <ExperienceCard
                  company="NexaDev"
                  role="Full Stack Developer"
                  period="Jan 2025 - Present"
                  description="Developed a comprehensive cab booking platform handling over 500 daily transactions with real-time tracking and payment integration."
                  isLeft={true}
                  isVisible={visibleItems[0]}
                />
              </CarouselItem>
              
              <CarouselItem className="md:basis-full">
                <ExperienceCard
                  company="VelocitiQ Technologies"
                  role="UI/UX Team Lead"
                  period="July 2024 - Aug 2024"
                  description="Led the redesign of the company's main website, resulting in a 40% increase in user engagement and a 25% reduction in bounce rate."
                  isLeft={false}
                  isVisible={visibleItems[1]}
                />
              </CarouselItem>
              
              <CarouselItem className="md:basis-full">
                <ExperienceCard
                  company="DOT – The Design Club"
                  role="Team Member"
                  period="Dec 2021 - May 2025"
                  description="Collaborated on multiple design projects including club identities and UI/UX improvements, focusing on accessibility and user-centered design."
                  isLeft={true}
                  isVisible={visibleItems[2]}
                />
              </CarouselItem>
            </CarouselContent>
            
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static transform-none rounded-full" />
              <CarouselNext className="static transform-none rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
