# 📝 Task Manager API

A robust RESTful API built with **Node.js 18**, **Express**, and **MongoDB**. This project emphasizes clean architecture, deterministic data handling, and full testability.

This API is designed to be fully compatible with **TAP + Supertest** suites, ensuring reliable performance and predictable task management.

---

## 🚀 Features

* **Full CRUD Support**: Create, Read, Update, and Delete tasks seamlessly.
* **Deterministic Task IDs**: Uses numeric IDs (1, 2, 3...) for predictable API consumption.
* **Persistence**: Powered by MongoDB with Mongoose ODM.
* **Automatic Seeding**: Ensures a consistent initial dataset on every startup.
* **Race-Condition Protection**: Implements a startup readiness gate to block requests until the database and seeding are ready.
* **Node.js 18 Optimized**: Built to leverage stable LTS features.

---

## 🧱 Tech Stack

| Technology | Purpose |
| --- | --- |
| **Node.js 18** | Runtime environment |
| **Express** | Web framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | Object Data Modeling (ODM) |
| **TAP** | Test runner for unit and integration tests |
| **Supertest** | High-level abstraction for testing HTTP |
| **Dotenv** | Environment variable management |

---

## 📂 Project Structure

```text
task-manager-api/
├── models/
│   └── task.model.js      # Task schema & Mongoose definition
├── services/
│   └── task.service.js    # Core business logic & DB interactions
├── controllers/
│   └── task.controller.js # Request/Response handling
├── routes/
│   └── task.routes.js     # API route definitions
├── test/
│   └── server.test.js     # TAP + Supertest integration tests
├── app.js                 # Express app setup (exported for testing)
├── server.js              # Entry point (server listener)
├── db.js                  # MongoDB connection configuration
├── startup.js             # DB + Seed synchronization logic
├── seed.js                # Initial data population script
├── .env                   # Configuration file
└── package.json           # Scripts and dependencies

```

---

## ⚙️ Setup Instructions

### 1️⃣ Prerequisites

Ensure you have **Node.js v18+** and **MongoDB** installed.

```bash
node -v # Should output v18.x.x

```

### 2️⃣ Install Dependencies

```bash
npm install

```

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/task_manager

```

### 4️⃣ Start MongoDB

If using Homebrew (macOS):

```bash
brew services start mongodb-community

```

Or run manually:

```bash
mongod

```

---

## 🧪 Testing & Execution

### Running Tests

The project uses **tap** and **supertest** to ensure API integrity.

```bash
npm test

```

**Expected Output:**

> Asserts: 19 pass  0 fail
> Suites:  1 pass  0 fail

### Start the Server

```bash
npm start

```

The server will be available at: `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/tasks` | Retrieve all tasks |
| `GET` | `/tasks/:id` | Get a specific task by numeric ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Remove a task |

---

## 🧠 Key Design Decisions

* **Numeric IDs with MongoDB**: To meet strict contract requirements, the API exposes numeric IDs. While MongoDB uses `_id` internally, a secondary `id` field is maintained and returned to the client.
* **Startup Readiness Gate**: Using a "readiness" approach, the server won't accept traffic until the MongoDB connection is healthy and the seed data is confirmed. This is critical for CI/CD pipelines and automated testing.
* **Deterministic Seeding**: `/tasks/1` is guaranteed to exist on startup, preventing "record not found" errors during initial test runs.

---

### ✅ Status

* **Tests:** Passing
* **Node Version:** 18.x
* **Database:** MongoDB
