"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

const FALLBACK_DATA = {
  education: [],
  achievements: [],
  volunteer: [],
  certifications: []
};

export default function AboutPage() {
  const [portfolioData, setPortfolioData] = useState<any>(FALLBACK_DATA);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setPortfolioData(data);
        }
      } catch {
        console.log("Using fallback contact data; API server not running or unreachable.");
      }
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    }, { threshold: 0.1 });

    const titles = document.querySelectorAll('.section-title');
    titles.forEach(el => observer.observe(el));
    
    return () => {
      titles.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 80px)", maxWidth: "1200px", margin: "0 auto", paddingBottom: "40px" }} id="top">
        {portfolioData.education && portfolioData.achievements && (
          <About education={portfolioData.education} achievements={portfolioData.achievements} />
        )}
        {portfolioData.volunteer && (
          <Experience experience={portfolioData.volunteer} />
        )}
        {portfolioData.certifications && (
          <Certifications certifications={portfolioData.certifications} />
        )}
      </main>
      <Footer />
    </>
  );
}
