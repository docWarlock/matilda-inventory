from backend.models import Item

def test_item_creation():
    item = Item(name="Salt", category="Pantry", expiry_date="2025-04-01")
    assert item.name == "Salt"
    assert item.category == "Pantry"
    assert item.expiry_date == "2025-04-01"
