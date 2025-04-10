import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          A showcase of my most significant work, demonstrating my skills and approach to solving real-world problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="Pock3tX"
            description="Web3 Wallet Generator with secure mnemonic key generation and multi-chain support."
            image="https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=2574&auto=format&fit=crop"
            techStack={["React", "Ethers.js", "Tailwind CSS"]}
            demoLink="https://pock3t-x.vercel.app/"
            githubLink="https://github.com/namrathm/pock3tx"
            delay={0}
          />
          
          <ProjectCard
            title="Fintellect"
            description="AI-powered finance tracker with real-time dashboards and predictive analytics."
            image="Fintellect.png" // Updated image path
            techStack={["Next.js", "Neon","Shadcn-ui", "Tailwind CSS"]}
            demoLink="https://fintellect-nam.vercel.app/"
            githubLink="https://github.com/namrathm/fintellect"
            delay={200}
          />
          
          <ProjectCard
            title="Hospify"
            description="React-based personalized healthcare service platform with appointment scheduling."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop"
            techStack={["React", "Node.js", "MongoDB", "Socket.io"]}
            githubLink="https://github.com/namrathm/hospify"
            delay={400}
            showDemo={false}
          />
        </div>
      </div>
    </section>
  );
}
