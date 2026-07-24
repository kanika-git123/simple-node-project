#!/bin/sh

# Start Node.js app in the background
node index.js &
NODE_PID=$!

# Start nginx in the foreground
nginx -g "daemon off;"

# Trap signals and pass them to Node.js
trap "kill $NODE_PID" SIGTERM SIGINT

wait $NODE_PID
