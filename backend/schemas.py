from pydantic import BaseModel, EmailStr
from datetime import datetime

class MessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime

    class Config:
        from_attributes = True

class VisitorStatsResponse(BaseModel):
    count: int

    class Config:
        from_attributes = True
