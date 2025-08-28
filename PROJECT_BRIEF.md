# Project Brief: Home Inventory System (HIS) — v2.0

## Goal
Build a self-hosted, modular, and scalable home inventory system to catalog **every item in your home** — from clothing to camping gear — using a hierarchical structure:  
`House → Room → Location → Container → Item`

Developed iteratively, one room at a time, with **TDD** at the core. Designed for long-term evolution with support for:
- Item photos
- Future barcode scanning
- Extensibility and maintainability

> 📌 **Current Focus**: Kitchen MVP with photo support *planned*, but not yet implemented.

---

## 🧩 Core Principles (Updated)

- **Start small, grow smart**: Begin with the kitchen. Validate structure before expanding.
- **Iterative development**: Each room reveals new needs → inform next feature.
- **Test-Driven Development (TDD)**: All features must have passing tests before merging.
- **Modular architecture**: Components should be reusable and composable.
- **Self-hosted**: Run entirely on local infrastructure (Synology NAS via Docker).
- **Extensible**: Design for future features (photos, barcodes, alerts, mobile access).
- **Data integrity**: Use PostgreSQL for consistency, even if schema evolves.

---

## 📦 Scope (Phase 0: Kitchen MVP — Now with Photo Planning)

### ✅ Core Features (MVP)
- [ ] Define a `House` model (one per instance)
- [ ] Add a `Room` (e.g., "Kitchen")
- [ ] Add a `Location` (e.g., "Pantry", "Drawer")
- [ ] Add a `Container` (e.g., "Glass Jar", "Tupperware Box")
- [ ] Add an `Item` with:
  - Name
  - Category (e.g., "Spices", "Canned Food")
  - Location (FK to Location)
  - Container (FK to Container, optional)
  - Description (optional)
  - Created timestamp
- [ ] Support for **item photos** (stored as file paths or URLs; not yet uploaded via UI)
  - **Design note**: Include a `photo_path` field in the `Item` model
  - **Initial state**: Photos are **not uploaded yet** — just stored as strings
  - **Future**: Add file upload via API/UI (after MVP)
- [ ] CRUD APIs for all models via FastAPI
- [ ] OpenAPI docs (auto-generated)

### 🛠️ Future-Proofing (Planned, Not in MVP)
- [ ] **Photo upload** (via API or frontend)
- [ ] **Barcode scanning** (via camera or QR/UPC input)
  - Store barcode as `barcode_id` (string) in `Item`
  - Later: use camera to scan, match against existing items
- [ ] **Search by name, category, location**
- [ ] **Expiry date tracking** (for food, medicine)
- [ ] **Mobile web app** (responsive design)

> ✅ **Photo & Barcode are NOT in MVP**, but **design must allow for them**.

---

## 📁 Updated Project Structure (with Photo/Barcode in Mind)
