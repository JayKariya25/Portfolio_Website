import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text
from database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String)
    subject = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class VisitorStat(Base):
    __tablename__ = "visitor_stats"

    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)
