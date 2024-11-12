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
│   │   └── client.go          # Redis configuration and functionality (InitRedisClient, GetAllKeys, AddKey, etc.)
│   └── templates/
│       └── dashboard.html     # HTML template for the dashboard
├── .dockerignore              # Specifies files and directories to ignore in the Docker build
├── .env.example               # Example environment variables file
├── go.mod
├── go.sum
└── README.md
```

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
   - After building the Docker image, use the following command to run the container:
     ```bash
     docker run -d -p 8101:8101 redis-management-system
     ```
   - Command explanation:
     - `-d` runs the container in detached mode (background)
     - `-p 8101:8101` maps port 8101 of the container to port 8101 of the host

   - Once the container is running, you can check its status with:
     ```bash
     docker ps
     ```

   - Access the Redis Management System at `http://localhost:8101`.

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
