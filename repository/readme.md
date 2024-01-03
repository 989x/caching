# Redis Management System

The primary objective is to create a Redis management system using Node.js. This system will provide an interface for interacting with Redis, allowing users to perform key operations.



## Getting Started

### Running the Application

To launch the application, run the following command

```bash
pnpm dev
```



## API Endpoints

### GET all app keys

Retrieve a list of all keys stored in the Redis instance.
```bash
GET {{baseurl}}/redis/all-keys
```

### GET key for entity

Retrieve keys for a specific entity.
```bash
GET {{baseurl}}/redis/get/:entity
```

### GET specific key for example entity

Retrieve a specific key for a given entity.
```bash
GET {{baseurl}}/redis/get/:entity/:key
```

### POST set key for example entity

Set a key for a specific entity with the provided data.
```bash
POST {{baseurl}}/redis/set/:entity/:key
Content-Type: application/json

{
  "value": { /* Your entity data here */ }
}
```

### DELETE specific key for example entity

Delete a specific key for a given entity.
```bash
DELETE {{baseurl}}/redis/delete/:entity/:key
```



## Install Dependencies

### Prerequisites

- Node.js installed
- Redis server installed (for local deployment)

### Installation

Follow these steps to initialize your project.

```bash
npm init -y

pnpm i nodemon

pnpm i dotenv

pnpm i --save-dev typescript ts-node @types/node

pnpm i express
pnpm i --save-dev @types/express
```

Next, install Redis and its corresponding type definitions.

```bash
pnpm i redis 
pnpm i --save-dev @types/redis
```

These dependencies are essential for the efficient caching functionality provided by this project.
