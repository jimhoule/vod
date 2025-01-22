#!/bin/sh

echo "Go to hono-server diectory"
cd /app/apps/hono-server

echo "Execute database migrations"
npm run db:migrate

echo "Start server"
npm start