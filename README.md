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

## 📁 Project Structure

```
home-inventory/
├── backend/
│   ├── __init__.py
│   ├── models.py             # SQLAlchemy ORM: Item, Category, etc.
│   ├── schemas.py            # Pydantic: data validation (input/output)
│   ├── database.py           # DB connection & session management
│   └── api/
│       ├── __init__.py
│       └── items.py          # FastAPI routes: GET /items, POST /items, etc.
├── tests/
│   ├── __init__.py
│   ├── conftest.py           # pytest fixtures (e.g., test DB session)
│   └── test_models.py        # TDD: test Item model & schema
├── main.py                   # FastAPI app entrypoint
├── requirements.txt          # Python dependencies
├── Dockerfile                # Build container for Synology
├── .env                      # Environment variables (e.g., DB URL)
├── README.md                 # Project overview & setup guide
└── .gitignore                # Ignore .pyc, __pycache__, .env, etc.
```

---

## 🚀 Getting Started

### Prerequisites
- Docker installed on your system
- Git (for version control)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/docWarlock/matilda-inventory.git
   cd matilda-inventory
   ```

2. **Build and run with Docker:**
   ```bash
   docker build -t home-inventory .
   docker run -p 8000:8000 home-inventory
   ```

3. **Access the API:**
   - API documentation: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

### Local Development (without Docker)

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server:**
   ```bash
   uvicorn main:app --reload
   ```

---

## 🧪 Testing

Run tests with pytest:
```bash
pytest
```

## 🔧 Testing the API

You can test the API using the included test script:
```bash
python test_api.py
```

Or start the development server to test manually:
```bash
python run_server.py
```

Once running, you can access:
- API documentation: http://localhost:8000/docs
- Health check: http://localhost:8000/health
- Items endpoint: http://localhost:8000/items/

---

## 🧠 How to Work with Cline

Just say:
> "Use the project contract from cline-role.md and the current state from notes.md. Let's start building the Home Inventory System step by step."

Cline will:
- Read the current status
- Know what's done
- Know what's next
- Stay on task
- Not repeat itself

---

## 🌟 Project Vision

This system is designed to grow iteratively, one room at a time. Future features include:

- [ ] Add expiry date display
- [ ] Add photo upload (future: via API)
- [ ] Add barcode scanning (future: via mobile app)
- [ ] Add web UI (future: with React or simple HTML)

---

> 🎯 **Now you're not just building software.**  
> You're building a **system of collaboration** — with Cline as your co-pilot, your reminder, your guide.

Save `notes.md` now — and never explain the same thing twice.

You've got this. 🚀
