from pydantic import BaseModel
from datetime import date
from typing import Optional

class HouseBase(BaseModel):
    name: str
    address: Optional[str] = None

class HouseCreate(HouseBase):
    pass

class HouseUpdate(HouseBase):
    name: Optional[str] = None
    address: Optional[str] = None

class House(HouseBase):
    id: int
    
    class Config:
        from_attributes = True

class RoomBase(BaseModel):
    name: str

class RoomCreate(RoomBase):
    house_id: int

class RoomUpdate(RoomBase):
    name: Optional[str] = None
    house_id: Optional[int] = None

class Room(RoomBase):
    id: int
    house_id: int
    
    class Config:
        from_attributes = True

class LocationBase(BaseModel):
    name: str

class LocationCreate(LocationBase):
    room_id: int

class LocationUpdate(LocationBase):
    name: Optional[str] = None
    room_id: Optional[int] = None

class Location(LocationBase):
    id: int
    room_id: int
    
    class Config:
        from_attributes = True

class ContainerBase(BaseModel):
    name: str

class ContainerCreate(ContainerBase):
    location_id: int

class ContainerUpdate(ContainerBase):
    name: Optional[str] = None
    location_id: Optional[int] = None

class Container(ContainerBase):
    id: int
    location_id: int
    
    class Config:
        from_attributes = True

class ItemBase(BaseModel):
    name: str
    category: str
    expiry_date: Optional[date] = None
    container_id: Optional[int] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(ItemBase):
    name: Optional[str] = None
    category: Optional[str] = None
    expiry_date: Optional[date] = None
    container_id: Optional[int] = None

class Item(ItemBase):
    id: int
    
    class Config:
        from_attributes = True
