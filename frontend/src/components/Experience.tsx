"use client";

import React from "react";
import styles from "./Experience.module.css";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="volunteer" className="section">
      <h2 className="section-title animate-fade-in">Volunteer Experience</h2>


      <div className={styles.timeline}>
        {experience.map((exp, index) => (
          <div key={index} className={`${styles.timelineNode} animate-fade-in`} style={{ animationDelay: `${index * 0.15}s` }}>
            <div className={styles.timelineMarker}>
              <div className={styles.markerCircle}></div>
              {index < experience.length - 1 && <div className={styles.markerLine}></div>}
            </div>
            
            <div className={styles.timelineContent}>
              <span className={styles.period}>{exp.period}</span>
              <h3 className={styles.role}>{exp.role}</h3>
              <h4 className={styles.company}>{exp.company}</h4>
              <ul className={styles.highlights}>
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.bullet}>&gt;</span>
                    <p className={styles.text}>{highlight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
