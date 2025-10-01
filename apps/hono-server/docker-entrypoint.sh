#!/bin/sh

echo "Go to db package directory"
cd /app/packages/db

echo "Execute database migrations"
npm run db:migrate

echo "Go to hono-server app directory"
cd /app/apps/hono-server

echo "Start server"
npm start
