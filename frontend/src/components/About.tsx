"use client";

import React from "react";
import styles from "./About.module.css";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  details: string;
}

interface AboutProps {
  education: EducationItem[];
  achievements: string[];
}

export default function About({ education, achievements }: AboutProps) {
  return (
    <section id="about" className="section">
      <h2 className="section-title animate-fade-in">About Me</h2>


      <div className={styles.container}>
        {/* Biography Block */}
        <div className={`${styles.bioBlock} glass-panel animate-fade-in`}>
          <div className={styles.bioContentLayout}>
            <div className={styles.bioTextContainer}>
              <h3 className={styles.blockTitle}>My Story</h3>
              <p className={styles.bioText}>
                I am currently pursuing my B.Tech in Computer Science at PES University, Bengaluru (Batch of 2027). I enjoy exploring the intersection of backend development, database design, and intelligent machine learning systems.
              </p>
              <p className={styles.bioText}>
                Throughout my studies, I have focused on building solid foundations in Data Structures & Algorithms, Operating Systems, and DBMS. Outside of coding, I participate actively in planning college events and am a district-level chess player.
              </p>
              
              <div className={styles.achievementsBox}>
                <h4 className={styles.achievementsTitle}>Highlights & Achievements</h4>
                <ul className={styles.achievementsList}>
                  {achievements.map((item, index) => (
                    <li key={index} className={styles.achievementItem}>
                      <svg className={styles.achievementIcon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className={styles.bioImageContainer}>
              <img src="/profile.jpg" alt="Jay Kariya" className={styles.profileImage} />
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <div className={styles.educationBlock}>
          <h3 className={styles.blockTitle}>Education</h3>
          <div className={styles.timeline}>
            {education.map((edu, index) => (
              <div key={index} className={`${styles.timelineItem} glass-panel-interactive animate-fade-in`}>
                <div className={styles.eduHeader}>
                  <h3 className={styles.institution}>{edu.institution}</h3>
                  <div className={styles.eduRight}>
                    <span className={styles.period}>{edu.period}</span>
                    {edu.location && <span className={styles.location}>{edu.location}</span>}
                  </div>
                </div>
                <h4 className={styles.degree}>{edu.degree}</h4>
                <p className={styles.details}>{edu.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
