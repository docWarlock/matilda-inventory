from pydantic import BaseModel
from datetime import date
from typing import Optional

class ItemBase(BaseModel):
    name: str
    category: str
    expiry_date: Optional[date] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    name: Optional[str] = None
    category: Optional[str] = None
    expiry_date: Optional[date] = None

class Item(ItemBase):
    id: int
    
    class Config:
        from_attributes = True
