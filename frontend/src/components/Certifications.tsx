"use client";

import React from "react";
import styles from "./Certifications.module.css";

interface CertificationItem {
  title: string;
  provider: string;
}

interface CertificationsProps {
  certifications: CertificationItem[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <section className="section">
      <h2 className="section-title animate-fade-in">Certifications</h2>


      <div className={styles.grid}>
        {certifications.map((cert, index) => (
          <div key={index} className={`${styles.card} glass-panel-interactive animate-fade-in`} style={{ animationDelay: `${index * 0.12}s` }}>
            <div className={styles.iconContainer}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.provider}>{cert.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
