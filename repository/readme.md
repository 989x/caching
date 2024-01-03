## Project Setup and Dependencies

Welcome to the efficient caching project utilizing Node.js and Redis. This guide will walk you through the setup process and help you install the necessary dependencies for seamless integration.



## Features

- **Flexible Configuration:** The Caching System is designed to be highly flexible, allowing you to configure caching for different entities seamlessly.

- **Local and Cloud Deployment:** The system supports both local and cloud-based Redis instances. You can easily switch between deployments based on your requirements.



## API Endpoints

### GET all app keys

```http
GET {{baseurl}}/redis/all-keys
```
Retrieve a list of all keys stored in the Redis instance.

### GET key for entity

```http
GET {{baseurl}}/redis/get/:entity
```
Retrieve keys for a specific entity.

### GET specific key for example entity

```http
GET {{baseurl}}/redis/get/:entity/:key
```
Retrieve a specific key for a given entity.

### POST set key for example entity

```http
POST {{baseurl}}/redis/set/:entity/:key
Content-Type: application/json

{
  "value": { /* Your entity data here */ }
}
```
Set a key for a specific entity with the provided data.

### DELETE specific key for example entity

```http
DELETE {{baseurl}}/redis/delete/:entity/:key
```

Delete a specific key for a given entity.



## Project Structure

The project structure is organized as follows:

```
repository/
|-- src/
|   |-- config/
|   |   |-- redis.config.ts
|   |-- controllers/
|   |   |-- redis.controller.ts
|   |-- routes/
|   |   |-- redis.routes.ts
|   |-- app.ts
|-- package.json
|-- readme.md
```

- **src/:** This directory houses the core source code of the application.
    - **controllers/:** Contains controllers responsible for managing business logic.
    - **routes/:** Defines route handlers for the application.
    - **config/:** Stores configuration files, such as **redis.config.ts**.
    - **app.ts:** The primary application file that sets up Express, middleware, and starts the server.



## Getting Started

### Running the Application

To launch the application, run the following command:

```bash
pnpm dev
```

### Prerequisites

- Node.js installed
- Redis server installed (for local deployment)

### Installation

Follow these steps to initialize your project:

```bash
npm init -y

pnpm i nodemon

pnpm i dotenv

pnpm i --save-dev typescript ts-node @types/node

pnpm i express
pnpm i --save-dev @types/express
```

Next, install Redis and its corresponding type definitions:

```bash
pnpm i redis 
pnpm i --save-dev @types/redis
```

These dependencies are essential for the efficient caching functionality provided by this project.
