# 🏠 Home Inventory System (HIS)

A self-hosted, modular, and scalable inventory system to catalog **every item in your home** — from cutlery to camping gear — organized hierarchically:  
`House → Room → Location → Container → Item`

Built with **TDD**, **Docker**, and **PostgreSQL**, designed to grow iteratively, one room at a time.

> 📌 **Current Status**: MVP in development — kitchen only.  
> 📌 **Hosted**: On Synology NAS via Docker (local only).  
> 📌 **Target**: Full home coverage with extensible structure.

---

## 🧩 Why This Project?

- **I want to know what I own** — no more lost items, no more duplicate purchases.
- **I want to organize my life** — visually and logically.
- **I want it to grow with me** — room by room, feature by feature.
- **I want control** — no cloud, no third-party data.

---

## 📦 Features (Phase 0: Kitchen MVP)

- Hierarchical inventory: House → Room → Location → Container → Item
- Full CRUD via REST API
- PostgreSQL-backed storage
- Simple frontend (HTML/CSS/JS) for basic interaction
- Dockerized for easy deployment
- Test-driven development (TDD)

---

## 🛠 Tech Stack

| Layer       | Technology             | Why? |
|------------|------------------------|------|
| Backend    | Python + FastAPI       | Fast, modern, great for APIs, excellent testing support |
| Database   | PostgreSQL             | Relational, ACID, schema flexibility, perfect for hierarchy |
| Frontend   | HTML/CSS/JS (vanilla)  | Lightweight, fast, no JS framework overhead for MVP |
| Testing    | pytest                 | Python’s best testing framework |
| Deployment | Docker + Docker Compose| Runs on Synology NAS, portable, isolated |
| Versioning | Git                    | Track evolution, collaborate (if needed) |

---

## 📁 Project Structure (Initial)

home-inventory/
│
├── backend/
│   ├── __init__.py
│   ├── models.py             # SQLAlchemy ORM: Item, Category, etc.
│   ├── schemas.py            # Pydantic: data validation (input/output)
│   ├── database.py           # DB connection & session management
│   └── api/
│       ├── __init__.py
│       └── items.py          # FastAPI routes: GET /items, POST /items, etc.
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py           # pytest fixtures (e.g., test DB session)
│   └── test_models.py        # TDD: test Item model & schema
│
├── main.py                   # FastAPI app entrypoint
├── requirements.txt          # Python dependencies
├── Dockerfile                # Build container for Synology
├── .env                      # Environment variables (e.g., DB URL)
├── README.md                 # Project overview & setup guide
└── .gitignore                # Ignore .pyc, __pycache__, .env, etc.

## 🧠 How to Start with Cline
Just say:
> "Use the project contract from cline-role.md and the current state from notes.md. Let’s start building the Home Inventory System step by step. Begin with the first task: write a failing test for the `Item` model in `tests/test_models.py`."