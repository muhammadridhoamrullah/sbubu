#!/bin/sh
set -e

echo "Menjalankan migrasi database..."
npx sequelize-cli db:migrate

echo "Migrasi selesai, menjalankan server..."
node app.js