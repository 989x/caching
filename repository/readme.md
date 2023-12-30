## Project Setup and Dependencies

Welcome to the efficient caching project utilizing Node.js and Redis. This guide will walk you through the setup process and help you install the necessary dependencies for seamless integration.

### Project Structure

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

- `src/:` This directory houses the core source code of the application.
    - `controllers/:` Contains controllers responsible for managing business logic.
    - `routes/:` Defines route handlers for the application.
    - `config/:` Stores configuration files, such as `redis.config.ts`.
    - `app.ts:` The primary application file that sets up Express, middleware, and starts the server.

### Getting Started

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

### Running the Application

To launch the application, run the following command:

```bash
pnpm dev
```
