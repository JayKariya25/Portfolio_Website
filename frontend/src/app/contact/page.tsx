"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const FALLBACK_DATA = {
  email: "jaykariya10c14@gmail.com",
  phone: "+91-9142503080",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    leetcode: "https://leetcode.com"
  }
};

export default function ContactPage() {
  const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data.email && data.phone && data.socials) {
            setPortfolioData({
              email: data.email,
              phone: data.phone,
              socials: data.socials
            });
          }
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
      <main style={{ padding: "100px 24px 40px", minHeight: "calc(100vh - 80px)", maxWidth: "1200px", margin: "0 auto" }} id="top">
        <Contact email={portfolioData.email} phone={portfolioData.phone} socials={portfolioData.socials} />
      </main>
      <Footer />
    </>
  );
}
