import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 mt-12 border-t border-muted/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Namrath Measala. All rights
              reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/NamrathM"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/namrath-m-a72767240/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/namrathnam"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
