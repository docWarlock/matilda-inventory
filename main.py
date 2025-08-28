from fastapi import FastAPI
from sqlalchemy.orm import Session
from backend import models, database
from backend.api import items

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Home Inventory System",
    description="A self-hosted home inventory system to catalog every item in your home",
    version="1.0.0"
)

# Include API routes
app.include_router(items.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Home Inventory System API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
