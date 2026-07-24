const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { once } = require('node:events');
const { startServer } = require('../src/server');

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body,
                });
            });
        });

        req.on('error', reject);
    });
}

async function withServer(fn) {
    const previousPort = process.env.PORT;
    const previousHost = process.env.HOST;

    process.env.PORT = '0';
    process.env.HOST = '127.0.0.1';

    const server = startServer();
    await once(server, 'listening');

    try {
        const address = server.address();
        if (!address || typeof address === 'string') {
            throw new Error('Server address is not available');
        }

        await fn(address.port);
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });

        if (previousPort === undefined) {
            delete process.env.PORT;
        } else {
            process.env.PORT = previousPort;
        }

        if (previousHost === undefined) {
            delete process.env.HOST;
        } else {
            process.env.HOST = previousHost;
        }
    }
}

test('GET /health returns ok', async () => {
    await withServer(async (port) => {
        const response = await makeRequest(`http://127.0.0.1:${port}/health`);
        assert.equal(response.statusCode, 200);
        assert.deepEqual(JSON.parse(response.body), { status: 'ok' });
    });
});

test('GET /api/hello returns hello world payload', async () => {
    await withServer(async (port) => {
        const response = await makeRequest(`http://127.0.0.1:${port}/api/hello`);
        assert.equal(response.statusCode, 200);
        assert.deepEqual(JSON.parse(response.body), { message: 'Hello World' });
    });
});
