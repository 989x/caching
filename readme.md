# Redis Management System

A simple Redis Management System built with Go and Fiber. This system provides a dashboard to view Redis cache keys, check the number of items within each cache, and delete unused cache entries. It also allows adding new keys for testing purposes.

## Project Structure

```plaintext
redis-management-system/
├── cmd/
│   └── main.go                # Main entry point
├── internal/
│   ├── handlers/
│   │   ├── dashboard.go       # Handles dashboard and key addition
│   │   └── delete.go          # Handles cache deletion
│   ├── redis/
│   │   ├── client.go          # Redis functionality (GetAllKeys, AddKey, etc.)
│   │   └── config.go          # Redis configuration setup
│   └── templates/
│       └── dashboard.html     # HTML template for the dashboard
├── .dockerignore              # Specifies files and directories to ignore in the Docker build
├── .env.example               # Example environment variables file
├── go.mod
├── go.sum
└── README.md
```

นี่คือส่วนเพิ่มเติมใน **README.md** เพื่ออธิบายขั้นตอนการใช้งาน Docker:

---

## Running with Docker

To run the Redis Management System in a Docker container, follow these steps:

1. **Copy `.env.example` to `.env`**:
   - Configure your Redis connection settings in the `.env` file.

2. **Build the Docker image**:
   - From the project root, run:
     ```bash
     docker build -t redis-management-system .
     ```

3. **Run the Docker container**:
   - Start the container using the `.env` file for environment variables:
     ```bash
     docker run --env-file .env -p 8101:8101 redis-management-system
     ```
   - This command will map port `8101` on your host to port `8101` in the container, allowing you to access the application from `http://localhost:8101`.

## Setup (Local Development)

1. Copy `.env.example` to `.env` and configure your Redis connection settings.
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Run the application:
   ```bash
   go run cmd/main.go
   ```
4. Access the dashboard at `http://localhost:8101`.

## Features

- View all cache keys and their item counts.
- Delete cache entries.
- Add new keys for testing.
