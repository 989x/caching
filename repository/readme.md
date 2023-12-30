## Project Setup and Dependencies

This guide outlines the steps to set up your project and install the required dependencies for efficient caching using Node.js and Redis.

### Getting Started

Initialize your project:

```bash
npm init -y

pnpm i nodemon

pnpm i dotenv

pnpm i --save-dev typescript ts-node @types/node

pnpm i express
pnpm i --save-dev @types/express
```

Install Redis and its type definitions:

```bash
pnpm i redis 
pnpm i --save-dev @types/redis
```
