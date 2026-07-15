"use client";

import React from "react";
import styles from "./Projects.module.css";

interface ProjectItem {
  title: string;
  subtitle?: string;
  highlights: string[];
  github?: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  // Map tech stack labels dynamically for tags
  const getTechStack = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("music")) {
      return ["HTML", "CSS", "JavaScript", "Audio API"];
    } else if (t.includes("drone") || t.includes("tracker")) {
      return ["Python", "FastAPI", "SQL", "Real-time Dashboard"];
    }
    return ["Web Development", "Software Engineering"];
  };

  return (
    <section id="projects" className="section">
      <h2 className="section-title animate-fade-in">Projects</h2>

      <div className={styles.grid}>
        {projects.map((project, index) => {
          const githubUrl = project.github || "https://github.com";
          const description = project.highlights.join(" ");

          return (
            <div key={index} className={`${styles.card} glass-panel-interactive animate-fade-in`} style={{ animationDelay: `${index * 0.15}s` }}>
              <div className={styles.header}>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                  <h3 className={styles.title}>
                    {project.title} <span className={styles.greenDot}>•</span>
                  </h3>
                </a>
              </div>

              <p className={styles.description}>
                {description}
              </p>

              <div className={styles.techTags}>
                {getTechStack(project.title).map((tech) => (
                  <span key={tech} className={styles.tag}>{tech}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
