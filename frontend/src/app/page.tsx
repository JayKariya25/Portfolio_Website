"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

// Fallback data in case the FastAPI backend is not running
const FALLBACK_DATA = {
  name: "Jay Kariya",
  title: "B.Tech Computer Science Student",
  location: "Bengaluru, India",
  email: "jaykariya10c14@gmail.com",
  phone: "+91-9142503080",
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    leetcode: "https://leetcode.com"
  },
  education: [
    {
      institution: "PES University, Bengaluru",
      degree: "B.Tech in Computer Science",
      period: "2023 – 2027"
    },
    {
      institution: "Carmel Junior College, Jamshedpur",
      degree: "ISC (Class XII)",
      period: "2008 - 2023",
    }
  ],
  skills: {
    "Languages": ["Java", "Python", "C", "C++"],
    "Web": ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "React.js"],
    "Database": ["MongoDB", "SQL", "Redis", "Neo4j"],
    "Machine Learning": ["TensorFlow", "PyTorch", "OpenCV"],
    "Core CS": ["Data Structures & Algorithms", "Operating Systems", "DBMS", "OOPS"],
    "Tools": ["Git", "VS Code"]
  },
  volunteer: [
    {
      role: "Event Manager",
      company: "PES University",
      period: "July 2024 – Aug 2025",
      highlights: [
        "Managed university events and coordinated teams of 20+ members.",
        "Handled logistics, planning, and execution."
      ]
    },
    {
      role: "Core Committee Member",
      company: "Carmel Junior College",
      period: "2022 – 2023",
      highlights: [
        "Led planning and execution of technical and cultural events."
      ]
    }
  ],
  work_experience: [
    {
      role: "AI Engineering Intern",
      company: "Centre for Innovation and Entrepreneurship",
      period: "June 2026 - Present",
      type: "On Site",
      logo: "/cie-logo.png",
      highlights: [
        "Building AI pipelines to extract formulas from PDFs and execute them on structured data."
      ]
    }
  ],
  projects: [
    {
      title: "JK Music Company",
      subtitle: "Music Website",
      highlights: [
        "Built a responsive music streaming website using HTML, CSS, and JavaScript.",
        "Implemented playlist functionality and interactive UI components.",
        "Optimized performance and improved user experience."
      ]
    },
    {
      title: "Rescue Drone Tracker",
      highlights: [
        "Developed a drone tracking system with SQL database integration.",
        "Designed frontend with real-time operational dashboard.",
        "Implemented efficient data retrieval and query optimization."
      ]
    }
  ],
  certifications: [
    { title: "Problem Solving Certification", provider: "HackerRank" },
    { title: "AWS Cloud Builder Learning Plan", provider: "Amazon Web Services" },
    { title: "Data Structures and Algorithms using C++", provider: "Code Help" }
  ],
  achievements: [
    "District-Level Chess Player.",
    "Participated in RYLA 2019."
  ]
};

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(FALLBACK_DATA);

  useEffect(() => {
    // Attempt to fetch fresh data from FastAPI
    const fetchPortfolio = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          setPortfolioData(data);
        }
      } catch {
        console.log("Using fallback portfolio data; API server not running or unreachable.");
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
      <main style={{ padding: "0 24px" }} id="top">
        <Hero
          name={portfolioData.name}
          title={portfolioData.title}
          location={portfolioData.location}
          email={portfolioData.email}
          socials={portfolioData.socials}
        />
        {portfolioData.work_experience && (
          <WorkExperience experience={portfolioData.work_experience} />
        )}
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
      </main>
      <Footer />
    </>
  );
}
