from backend.models import House, Room, Location, Container, Item
from backend.schemas import HouseCreate, RoomCreate, LocationCreate, ContainerCreate, ItemCreate

def test_house_creation():
    house = House(name="Main House")
    assert house.name == "Main House"

def test_room_creation():
    room = Room(name="Living Room", house_id=1)
    assert room.name == "Living Room"
    assert room.house_id == 1

def test_location_creation():
    location = Location(name="Shelf", room_id=1)
    assert location.name == "Shelf"
    assert location.room_id == 1

def test_container_creation():
    container = Container(name="Box", location_id=1)
    assert container.name == "Box"
    assert container.location_id == 1

def test_item_creation():
    item = Item(name="Salt", category="Pantry", expiry_date="2025-04-01", container_id=1)
    assert item.name == "Salt"
    assert item.category == "Pantry"
    assert item.expiry_date == "2025-04-01"
    assert item.container_id == 1

# Test schemas
def test_house_schema():
    house_data = {"name": "Main House"}
    house = HouseCreate(**house_data)
    assert house.name == "Main House"

def test_room_schema():
    room_data = {"name": "Living Room", "house_id": 1}
    room = RoomCreate(**room_data)
    assert room.name == "Living Room"
    assert room.house_id == 1

def test_location_schema():
    location_data = {"name": "Shelf", "room_id": 1}
    location = LocationCreate(**location_data)
    assert location.name == "Shelf"
    assert location.room_id == 1

def test_container_schema():
    container_data = {"name": "Box", "location_id": 1}
    container = ContainerCreate(**container_data)
    assert container.name == "Box"
    assert container.location_id == 1

def test_item_schema():
    item_data = {"name": "Salt", "category": "Pantry", "expiry_date": "2025-04-01", "container_id": 1}
    item = ItemCreate(**item_data)
    assert item.name == "Salt"
    assert item.category == "Pantry"
    assert item.expiry_date == "2025-04-01"
    assert item.container_id == 1
