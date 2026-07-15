"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
  name: string;
  title: string;
  location: string;
  email: string;
  socials: {
    linkedin: string;
    github: string;
    leetcode: string;
  };
}

export default function Hero({ name, title, location, email, socials }: HeroProps) {
  return (
    <section className={`${styles.heroSection} animate-fade-in`}>
      <div className={`${styles.heroCard} glass-panel`}>
        <div className={styles.heroContent}>
          <span className={styles.tagline}>Welcome to my space</span>
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.location}>
            <svg className={styles.locationIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25gC4.5 6.358 7.858 3 12 3s7.5 3.358 7.5 7.5z" />
            </svg>
            {location}
          </p>
          <p className={styles.description}>
            I am an aspiring software engineer specializing in backend systems and computer science fundamentals. Passionate about problem-solving, algorithms, and building efficient full-stack web applications.
          </p>
          

          <div className={styles.socials}>
            <a href="/cv.pdf" download className={styles.socialIcon} aria-label="Download CV" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 12px', width: 'auto' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CV</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
            <a href={`mailto:${email}`} className={styles.socialIcon} aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href={socials.leetcode} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LeetCode / Coding Challenges">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" title="Coding Challenges">
                <path d="M4 17l6-6-6-6M12 19h8" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.heroImageContainer}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/avatar.png"
              alt={name}
              width={280}
              height={280}
              priority
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
