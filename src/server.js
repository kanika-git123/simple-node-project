const http = require('http');

function startServer() {
    const configuredPort = process.env.PORT;
    const port = configuredPort === undefined ? 3000 : Number(configuredPort);
    const host = process.env.HOST || '127.0.0.1';
    const message = process.env.MESSAGE || 'Hello from Node.js!';

    const server = http.createServer((req, res) => {
        if (req.url === '/health') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ status: 'ok' }));
            return;
        }

        if (req.url === '/api/hello') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ message: 'Hello World' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${message}\n`);
    });

    server.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`);
    });

    return server;
}

module.exports = { startServer };
