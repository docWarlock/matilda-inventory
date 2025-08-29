from fastapi import FastAPI
from sqlalchemy.orm import Session
from backend import models, database
from backend.api import items, houses, rooms, locations, containers
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="Home Inventory System",
    description="A self-hosted home inventory system to catalog every item in your home",
    version="1.0.0"
)

# Add CORS middleware - more comprehensive configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Include API routes
app.include_router(items.router)
app.include_router(houses.router)
app.include_router(rooms.router)
app.include_router(locations.router)
app.include_router(containers.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Home Inventory System API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
