"use client";

import React from "react";
import styles from "./WorkExperience.module.css";

interface WorkExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  logo: string;
  highlights: string[];
}

interface WorkExperienceProps {
  experience: WorkExperienceItem[];
}

export default function WorkExperience({ experience }: WorkExperienceProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="work" className="section">
      <h2 className="section-title animate-fade-in">Work Experience</h2>

      <div className={styles.timelineContainer}>
        {experience.map((exp, index) => (
          <div key={index} className={`${styles.timelineNode} animate-fade-in`} style={{ animationDelay: `${index * 0.15}s` }}>
            {/* Left side: Timeline marker with logo */}
            <div className={styles.timelineMarker}>
              <div className={styles.logoCircle}>
                <img src={exp.logo} alt={`${exp.company} logo`} className={styles.logoImage} />
              </div>
              {index < experience.length - 1 && <div className={styles.markerLine}></div>}
            </div>
            
            {/* Right side: Card */}
            <div className={`${styles.card} glass-panel-interactive`}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <h3 className={styles.companyName}>{exp.company}</h3>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.period}>{exp.period}</span>
                </div>
              </div>
              
              <div className={styles.cardSubHeader}>
                <h4 className={styles.role}>{exp.role}</h4>
                {exp.type && <span className={styles.badge}>{exp.type}</span>}
              </div>

              <div className={styles.cardBody}>
                {exp.highlights.map((highlight, idx) => (
                  <p key={idx} className={styles.text}>{highlight}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
