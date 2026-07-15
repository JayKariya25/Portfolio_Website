"use client";

import React from "react";
import styles from "./Skills.module.css";

interface SkillsProps {
  skills: {
    [category: string]: string[];
  };
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="section">
      <h2 className="section-title animate-fade-in">Technical Skills</h2>

      
      <div className={styles.grid}>
        {Object.entries(skills).map(([category, items], catIndex) => (
          <div key={category} className={`${styles.card} glass-panel animate-fade-in`} style={{ animationDelay: `${catIndex * 0.1}s` }}>
            <h3 className={styles.categoryTitle}>
              <span className={styles.indicator}></span>
              {category}
            </h3>
            <div className={styles.badgeContainer}>
              {items.map((skill) => (
                <span key={skill} className={`${styles.badge} glass-panel-interactive`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
