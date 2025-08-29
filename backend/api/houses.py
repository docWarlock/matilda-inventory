from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(
    prefix="/houses",
    tags=["houses"]
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.House)
def create_house(house: schemas.HouseCreate, db: Session = Depends(get_db)):
    db_house = models.House(**house.model_dump())
    db.add(db_house)
    db.commit()
    db.refresh(db_house)
    return db_house

@router.get("/", response_model=List[schemas.House])
def read_houses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    houses = db.query(models.House).offset(skip).limit(limit).all()
    return houses

@router.get("/{house_id}", response_model=schemas.House)
def read_house(house_id: int, db: Session = Depends(get_db)):
    db_house = db.query(models.House).filter(models.House.id == house_id).first()
    if db_house is None:
        raise HTTPException(status_code=404, detail="House not found")
    return db_house

@router.put("/{house_id}", response_model=schemas.House)
def update_house(house_id: int, house: schemas.HouseUpdate, db: Session = Depends(get_db)):
    db_house = db.query(models.House).filter(models.House.id == house_id).first()
    if db_house is None:
        raise HTTPException(status_code=404, detail="House not found")
    
    update_data = house.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_house, key, value)
    
    db.commit()
    db.refresh(db_house)
    return db_house

@router.delete("/{house_id}")
def delete_house(house_id: int, db: Session = Depends(get_db)):
    db_house = db.query(models.House).filter(models.House.id == house_id).first()
    if db_house is None:
        raise HTTPException(status_code=404, detail="House not found")
    
    db.delete(db_house)
    db.commit()
    return {"message": "House deleted successfully"}
