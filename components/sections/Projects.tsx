import Image from "next/image";
import { ExternalLink, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-8 px-6 py-20 sm:px-10"
    >
      <SectionHeading watermark="PORTFOLIO" title="My Work" />

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.cover}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.tagline}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-4 pt-6">
                {project.isPrivate ? (
                  <span className="flex items-center gap-2 text-sm font-medium text-muted">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Private project
                  </span>
                ) : (
                  project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                      className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                    >
                      <FaGithub className="h-4 w-4" aria-hidden="true" />
                      Code
                    </a>
                  )
                )}

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
