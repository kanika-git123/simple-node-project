# Simple Node.js Project

This project is a clean Node.js starter with a small HTTP server, sensible scripts, and a simple structure for future growth.

## Structure

- index.js: application entrypoint
- src/server.js: server setup and route handling

## Run

```bash
npm start
```

## Health check

```bash
curl http://127.0.0.1:3000/health
```

## Environment variables

- PORT: port number for the server (default: 3000)
- HOST: host address for the server (default: 127.0.0.1)
- MESSAGE: response message shown at the root route
