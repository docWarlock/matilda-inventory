from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class House(Base):
    __tablename__ = "houses"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    
    # Relationship to rooms
    rooms = relationship("Room", back_populates="house")

class Room(Base):
    __tablename__ = "rooms"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    house_id = Column(Integer, ForeignKey("houses.id"))
    
    # Relationships
    house = relationship("House", back_populates="rooms")
    locations = relationship("Location", back_populates="room")

class Location(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    room_id = Column(Integer, ForeignKey("rooms.id"))
    
    # Relationships
    room = relationship("Room", back_populates="locations")
    containers = relationship("Container", back_populates="location")

class Container(Base):
    __tablename__ = "containers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"))
    
    # Relationships
    location = relationship("Location", back_populates="containers")
    items = relationship("Item", back_populates="container")

class Item(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    expiry_date = Column(Date)
    container_id = Column(Integer, ForeignKey("containers.id"))
    
    # Relationship
    container = relationship("Container", back_populates="items")
