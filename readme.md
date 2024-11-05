# Redis Management System

A simple Redis Management System built with Go and Fiber. This system provides a dashboard to view Redis cache keys, check the number of items within each cache, and delete unused cache entries. It also allows adding new keys for testing purposes.

## Project Structure

```plaintext
redis-management-system/
├── cmd/
│   └── main.go               # Main entry point
├── internal/
│   ├── handlers/
│   │   ├── dashboard.go      # Handles dashboard and key addition
│   │   └── delete.go         # Handles cache deletion
│   ├── redis/
│   │   └── client.go         # Redis connection and data retrieval functions
│   └── templates/
│       └── dashboard.html    # HTML template for the dashboard
├── .env.example              # Example environment variables file
├── go.mod
├── go.sum
└── README.md
```

## Setup

1. Copy `.env.example` to `.env` and configure your Redis connection settings.
2. Install dependencies:
   ```bash
   go mod tidy
   ```
3. Run the application:
   ```bash
   go run cmd/main.go
   ```
4. Access the dashboard at `http://localhost:8080`.

## Features

- View all cache keys and their item counts.
- Delete cache entries.
- Add new keys for testing.
