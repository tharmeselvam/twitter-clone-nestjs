# 🐦 Twitter Clone — NestJS Backend

A RESTful backend API for a Twitter-like social platform, built with **NestJS**, **TypeORM**, and **PostgreSQL**. Supports user authentication, tweeting, replying, liking, and following.

> ⚠️ Work in progress — core features are implemented and stable.

---

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) (Node.js + TypeScript)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens)
- **Containerization:** Docker & Docker Compose
- **Package Manager:** Yarn

---

## Features

- 🔐 **Authentication** — Sign up and log in with JWT-based auth
- 🐦 **Tweets** — Create and view tweets
- 💬 **Replies** — Reply to existing tweets
- ❤️ **Likes** — Like and unlike tweets
- 👥 **Follow System** — Follow and unfollow other users

---

## Project Structure

```
twitter-clone-nestjs/
├── src/                   # Application source code (NestJS modules)
├── db/
│   └── migrations/        # TypeORM database migrations
├── test/                  # End-to-end tests
├── data-source.ts         # TypeORM DataSource configuration
├── Dockerfile             # Docker image definition
├── docker-compose.yml     # Docker Compose setup
├── example.env            # Environment variable template (local)
├── example.docker.env     # Environment variable template (Docker)
└── nest-cli.json          # NestJS CLI config
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Yarn
- Docker

### 1. Clone the Repository

```bash
git clone https://github.com/tharmeselvam/twitter-clone-nestjs.git
cd twitter-clone-nestjs
```

### 2. Configure Environment Variables

Copy the example .env and docker.env files:

```bash
cp example.env .env
cp example.docker.env docker.env
```

### 3. Start All Services

```bash
docker compose up -d --build
```

This will spin up the NestJS app, a PostgreSQL instance, and a Redis instance together.

### 4. Run Database Migrations

```bash
yarn docker:migrate
```

The API will be available at `http://localhost:3000`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/auth/sign-up` | Register a new user | ❌ |
| `POST` | `/auth/log-in` | Log in and receive JWT | ❌ |
| `DELETE` | `/auth/log-out` | Log out and delete token | ✅ |
| `GET` | `/auth/tokens` | Refresh tokens | ✅ |

### Tweets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/tweets/create` | Create a new tweet | ✅ |
| `GET` | `/tweets` | Get all tweets | ✅ |
| `GET` | `/tweets/:id` | Get a tweet by ID | ✅ |
| `POST` | `/tweets/:id/reply` | Reply to a tweet | ✅ |
| `GET` | `/tweets/:id/replies` | Get a tweet's replies | ❌ |
| `POST` | `/tweets/:id/like` | Like or unlike a tweet | ✅ |
| `GET` | `/tweets/following` | Get tweets of followed users | ✅ |
| `GET` | `/tweets/me` | Get tweets of logged in user | ✅ |
| `GET` | `/tweets/user/:id` | Get tweets of a particular user | ❌ |

### Search

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `GET` | `/search/users` | Get users matching a search keyword | ✅ |
| `GET` | `/search/tweets` | Get tweets matching a search keyword | ✅ |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| `POST` | `/users/:id/follow` | Follow or unfollow a user | ✅ |

> **Note:** All protected routes require a `Bearer <token>` header.

---

## Roadmap

- [ ] Retweets
- [ ] User profile updates (bio, avatar)
- [ ] Timeline / feed endpoint
- [ ] Pagination
- [ ] Search
- [ ] Notifications
