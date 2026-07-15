from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from database import engine, Base, get_db
from models import Message, VisitorStat
from schemas import MessageCreate, MessageResponse, VisitorStatsResponse

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Jay Kariya Portfolio API", version="1.0.0")

# Setup CORS to allow Next.js frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static Portfolio Data to show dynamic integration
PORTFOLIO_DATA = {
    "name": "Jay Kariya",
    "title": "B.Tech Computer Science Student",
    "location": "Bengaluru, India",
    "email": "jaykariya10c14@gmail.com",
    "phone": "+91-9142503080",
    "socials": {
        "linkedin": "https://linkedin.com",  # Standard links to showcase
        "github": "https://github.com",
        "leetcode": "https://leetcode.com"
    },
    "education": [
        {
            "institution": "PES University",
            "degree": "B.Tech in Computer Science",
            "period": "2023 – 2027",
            "location": "Bengaluru, KA"
        },
        {
            "institution": "Carmel Junior College",
            "degree": "Secondary and Higher Education",
            "period": "2008 – 2023",
            "location": "Jamshedpur, JH"
        }
    ],
    "skills": {
        "Languages": ["Java", "Python", "C", "C++"],
        "Web": ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "React.js"],
        "Database": ["MongoDB", "SQL", "Redis", "Neo4j"],
        "Machine Learning": ["TensorFlow", "PyTorch", "OpenCV"],
        "Core CS": ["Data Structures & Algorithms", "Operating Systems", "DBMS", "OOPS"],
        "Tools": ["Git", "VS Code"]
    },
    "volunteer": [
        {
            "role": "Event Manager",
            "company": "PES University",
            "period": "July 2024 – Aug 2025",
            "highlights": [
                "Managed university events and coordinated teams of 20+ members.",
                "Handled logistics, planning, and execution."
            ]
        },
        {
            "role": "Core Committee Member",
            "company": "Carmel Junior College",
            "period": "2022 – 2023",
            "highlights": [
                "Led planning and execution of technical and cultural events."
            ]
        }
    ],
    "work_experience": [
        {
            "role": "AI Engineering Intern",
            "company": "Centre for Innovation and Entrepreneurship",
            "period": "June 2026 - Present",
            "type": "On Site",
            "logo": "/cie-logo.png",
            "highlights": [
                "Building AI pipelines to extract formulas from PDFs and execute them on structured data."
            ]
        }
    ],
    "projects": [
        {
            "title": "JK Music Company",
            "subtitle": "Music Website",
            "highlights": [
                "Built a responsive music streaming website using HTML, CSS, and JavaScript.",
                "Implemented playlist functionality and interactive UI components.",
                "Optimized performance and improved user experience."
            ]
        },
        {
            "title": "Rescue Drone Tracker",
            "highlights": [
                "Developed a drone tracking system with SQL database integration.",
                "Designed frontend with real-time operational dashboard.",
                "Implemented efficient data retrieval and query optimization."
            ]
        }
    ],
    "certifications": [
        {"title": "Problem Solving Certification", "provider": "HackerRank"},
        {"title": "AWS Cloud Builder Learning Plan", "provider": "Amazon Web Services"},
        {"title": "Data Structures and Algorithms using C++", "provider": "Code Help"}
    ],
    "achievements": [
        "District-Level Chess Player.",
        "Participated in RYLA 2019."
    ]
}

@app.get("/")
def read_root():
    return {"message": "Welcome to Jay Kariya's Portfolio API"}

@app.get("/api/portfolio")
def get_portfolio_data():
    return PORTFOLIO_DATA

@app.post("/api/contact", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_form(message: MessageCreate, db: Session = Depends(get_db)):
    db_message = Message(
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@app.post("/api/visitor/increment", response_model=VisitorStatsResponse)
def increment_visitor(db: Session = Depends(get_db)):
    stat = db.query(VisitorStat).filter(VisitorStat.id == 1).first()
    if not stat:
        stat = VisitorStat(id=1, count=1)
        db.add(stat)
    else:
        stat.count += 1
    db.commit()
    db.refresh(stat)
    return stat

@app.get("/api/visitor", response_model=VisitorStatsResponse)
def get_visitor_count(db: Session = Depends(get_db)):
    stat = db.query(VisitorStat).filter(VisitorStat.id == 1).first()
    if not stat:
        stat = VisitorStat(id=1, count=0)
        db.add(stat)
        db.commit()
        db.refresh(stat)
    return stat
