# Home Inventory — PROJECT\_BRIEF.md (for Cline)

**Goal:** Build a simple, robust home‑inventory app that starts with a working frontend UI, then connects to a minimal backend that accepts inputs, and finally persists data to a database. The MVP should comfortably inventory a clothing closet while supporting a general **hierarchical storage model** that can subdivide a house into rooms → areas → storage locations → items.

---

## TL;DR for Cline

1. **Ship a usable UI first** that shows a navigable tree of locations (mock data initially), with the ability to add/edit/delete locations and items.
2. **Add a thin backend** with in‑memory storage implementing the same APIs used by the frontend.
3. **Swap in SQLite** for persistence via Prisma (keep same API).
4. Keep each step shippable; preserve data model & API contracts.

---

## Product Scope (MVP)

* **Users can:**

  * Navigate a hierarchical storage tree: House → Room → Area → Storage → (…any depth…) → Item.
  * Create, rename, and remove **Locations** at any level.
  * Create, edit, move, and delete **Items** under a chosen Location.
  * See breadcrumbs and child counts.
  * Search by item name (simple, client‑side first; server‑side after API exists).
* **Out of scope for MVP:** auth, image uploads, barcode/QR, sharing, offline mode.

### Definitions

* **Location**: a node in the hierarchy (e.g., House, Bedroom, Closet, Shelf, Bin). Unlimited depth.
* **Item**: an object stored under a specific Location (e.g., “Blue Hoodie”).

---

## Architecture (recommended)

* **Monorepo** (simple):

  * `client/` — React + Vite + TypeScript + Tailwind UI (shadcn optional later)
  * `server/` — Node.js + TypeScript + Fastify (or Express) + Zod for input validation
  * `db/` — Prisma schema + SQLite (file‑based). Easy future switch to Postgres.
* **Why this stack?** Fast DX, type‑safe, portable, trivial local setup.

> **Note:** If the operator requests a different stack (e.g., Next.js + FastAPI + SQLModel), keep the **data model** and **API** identical.

---

## Data Model

```text
Location
- id (string, cuid/uuid)
- name (string, required)
- type (enum: HOUSE | ROOM | AREA | STORAGE | OTHER)
- parentId (string | null)  // null for root(s)
- createdAt (datetime)
- updatedAt (datetime)

Item
- id (string, cuid/uuid)
- name (string, required)
- description (string, optional)
- quantity (int, default 1)
- locationId (string, FK Location.id)
- tags (string[], optional)  // Prisma: string[] on Postgres, json on SQLite
- createdAt (datetime)
- updatedAt (datetime)
```

### Prisma schema sketch (SQLite)

```prisma
model Location {
  id        String    @id @default(cuid())
  name      String
  type      LocationType @default(OTHER)
  parentId  String?  @db.Text
  parent    Location? @relation("LocationToChildren", fields: [parentId], references: [id])
  children  Location[] @relation("LocationToChildren")
  items     Item[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

enum LocationType {
  HOUSE
  ROOM
  AREA
  STORAGE
  OTHER
}

model Item {
  id         String   @id @default(cuid())
  name       String
  description String?
  quantity    Int      @default(1)
  locationId  String
  location    Location @relation(fields: [locationId], references: [id])
  tags        String?  // JSON-encoded or comma-separated for SQLite simplicity
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## API (stable contract)

**Base URL:** `http://localhost:5174/api` (server default port 5174, client 5173)

### Locations

* `GET /locations/root` → list root locations (often 1: “My House”).
* `GET /locations/:id` → details + children + item count.
* `GET /locations/:id/children` → child locations (paged optional `?q=` filter).
* `POST /locations` → create `{ name, type, parentId? }`.
* `PATCH /locations/:id` → rename or change type.
* `DELETE /locations/:id` → delete (option: cascade=false → block if children/items exist).
* `GET /tree/:id` → nested tree (depth-limited: `?depth=3`).

### Items

* `GET /items?locationId=...&q=...` → list/search items under a location.
* `POST /items` → `{ name, description?, quantity?, locationId, tags? }`.
* `PATCH /items/:id` → edit fields, or move with new `locationId`.
* `DELETE /items/:id`.

### Health

* `GET /healthz` → `{ status: "ok" }`.

**Validation:** All write routes validate with Zod (400 on invalid input).

---

## UI (MVP)

* **Layout:**

  * Left: **Location Tree** (collapsible), Root → Rooms → Areas → Storage.
  * Top: **Breadcrumbs** for current node.
  * Main: **Item Grid/List** for the selected Location.
  * Actions: “+ Location”, “+ Item”, inline rename/delete, search input.
* **Quality of life:** toast notifications, optimistic updates in client.

---

## Project Structure

```text
home-inventory/
  client/
    src/
      app/
      components/
      lib/
    index.html
    vite.config.ts
    package.json
  server/
    src/
      index.ts
      routes/
        locations.ts
        items.ts
      db/
        memory.ts   // in-memory store for M2
        prisma.ts   // prisma client for M3
    package.json
  db/
    schema.prisma
  package.json  // npm workspaces (optional)
  README.md
```

---

## Milestones & Tasks (Cline — follow in order)

### **M1 — Frontend (mocked) \[deliver first]**

**Goal:** A usable UI with fake data; no backend required.

1. Create `client` with Vite + React + TS + Tailwind.
2. Build components: Tree, Breadcrumbs, ItemList, Modals (Add Location/Item).
3. Add a local **mock store** (e.g., Zustand) that implements the **same shape** as the future API.
4. Implement CRUD in the mock store; persist to `localStorage` for demo.
5. Add simple search (name contains).
6. Provide a seed: one House → Bedroom → Closet → Shelf; add 5–10 items.
7. **Acceptance:** User can navigate, add/move/delete, and see immediate updates.

**Run:** `cd client && npm i && npm run dev` (target: [http://localhost:5173](http://localhost:5173))

---

### **M2 — Backend (in-memory)**

**Goal:** Replace mock calls with real HTTP using the API contract; keep data ephemeral.

1. Create `server` with Fastify + TS + Zod.
2. Implement routes above using an **in-memory store** (`Map`/arrays in `db/memory.ts`).
3. Add CORS for `http://localhost:5173`.
4. Wire client to environment var `VITE_API_URL` and swap fetch layer.
5. **Acceptance:** All UI flows work against the in-memory API; page refresh loses data.

**Run:** `cd server && npm i && npm run dev` (start on `5174`).

---

### **M3 — Database (SQLite via Prisma)**

**Goal:** Persist data while keeping the same API.

1. Add Prisma + SQLite, generate schema from **Data Model**.
2. Implement repository layer; swap memory store → Prisma.
3. Add seed script mirroring M1 defaults.
4. Optional: `docker-compose.yml` for Postgres parity; keep SQLite as default.
5. **Acceptance:** Data persists across restarts; CRUD + search behave the same.

**Commands:**

```bash
cd db
npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name init
npx prisma generate
```

---

## Non-Goals (for now)

* Authentication/Accounts
* Media uploads (photos), barcode/QR, bulk import/export
* Multi-user collaboration
* Role-based permissions

---

## Developer Notes & Guardrails (for Cline)

* Ask before **large refactors**; otherwise, keep PR-sized steps.
* Maintain the **API contract** and **data model** as stable interfaces.
* Prefer **pure functions** for tree operations (find/move nodes) and keep them unit-tested.
* Add minimal error handling and 404/400 responses.
* Keep envs: `VITE_API_URL`, `PORT=5174`.
* Lint/format: ESLint + Prettier; Git hooks optional.

---

## Test Plan (lightweight)

* **Locations:** create child, rename, delete (blocked if children/items and `cascade=false`).
* **Items:** create, edit, move to another Location, delete.
* **Search:** returns items containing query (case-insensitive).
* **Tree:** breadcrumbs update correctly; counts reflect changes.
* **Persistence:** data survives server restart after M3.

---

## Example User Flows (MVP)

1. **Create structure:** House → Bedroom → Closet → Shelf.
2. **Add clothing items** to Shelf: “Blue Hoodie”, “Black Jeans x2”, “Red Scarf”.
3. **Move** “Red Scarf” from Shelf → Drawer.
4. **Search** `hoodie` shows “Blue Hoodie”.

---

## Future Enhancements (nice-to-haves)

* Drag-and-drop to move locations/items
* Bulk import from CSV
* Photos for items, basic image dedupe
* Simple auth (local-first or Supabase)
* Sharing/export (PDF/CSV)

---

## Quickstart Scripts (suggested)

* Root `package.json` workspaces:

```json
{
  "private": true,
  "workspaces": ["client", "server"],
  "scripts": {
    "dev": "concurrently \"npm:dev:*\"",
    "dev:client": "npm --workspace client run dev",
    "dev:server": "npm --workspace server run dev"
  }
}
```

> Ensure `concurrently` is added at root if using the combined dev script.

---

## Acceptance Criteria (operator-facing)

* After **M1**, I can see and interact with a working UI that lets me build a closet tree and add items using mock data.
* After **M2**, the same UI works against a local server; refreshing clears data (by design).
* After **M3**, data persists in SQLite; restarting the server does **not** lose data.

---

**That’s it.** Follow milestones in order and keep each step shippable. If anything is ambiguous, prefer the simplest choice that preserves the API/data model above.
