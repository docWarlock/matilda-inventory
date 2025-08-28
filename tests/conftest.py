import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.database import Base, engine, SessionLocal

# Create test database
TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

Base.metadata.create_all(bind=test_engine)

@pytest.fixture(scope="function")
def db_session():
    """Create a new database session for a test"""
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture(scope="function")
def override_get_db():
    """Override the database dependency"""
    def get_db():
        try:
            yield TestingSessionLocal()
        finally:
            pass
    return get_db
