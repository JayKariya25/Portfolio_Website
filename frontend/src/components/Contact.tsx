"use client";

import React from "react";
import styles from "./Contact.module.css";

interface ContactProps {
  email: string;
  phone: string;
  socials: {
    linkedin: string;
    github: string;
    leetcode: string;
  };
}

export default function Contact({ email, phone, socials }: ContactProps) {
  return (
    <section id="contact" className="section">
      <h2 className="section-title animate-fade-in">Have a project in mind? Let's talk.</h2>
      
      <div className={styles.container}>
        <div className={styles.tilesGrid}>
          {/* Email Tile */}
          <a href={`mailto:${email}`} className={`${styles.tile} glass-panel-interactive animate-fade-in`}>
            <div className={styles.iconContainer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className={styles.tileContent}>
              <h4>Email</h4>
              <span className={styles.link}>{email}</span>
            </div>
          </a>



          {/* LinkedIn Tile */}
          <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={`${styles.tile} glass-panel-interactive animate-fade-in`} style={{ animationDelay: '0.2s' }}>
            <div className={styles.iconContainer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
            </div>
            <div className={styles.tileContent}>
              <h4>LinkedIn</h4>
              <span className={styles.link}>Connect</span>
            </div>
          </a>

          {/* GitHub Tile */}
          <a href={socials.github} target="_blank" rel="noopener noreferrer" className={`${styles.tile} glass-panel-interactive animate-fade-in`} style={{ animationDelay: '0.3s' }}>
            <div className={styles.iconContainer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <div className={styles.tileContent}>
              <h4>GitHub</h4>
              <span className={styles.link}>Follow</span>
            </div>
          </a>

          {/* LeetCode Tile */}
          <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className={`${styles.tile} glass-panel-interactive animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <div className={styles.iconContainer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-6-6-6M12 19h8" />
              </svg>
            </div>
            <div className={styles.tileContent}>
              <h4>LeetCode</h4>
              <span className={styles.link}>View Profile</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
