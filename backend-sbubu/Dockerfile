
# STAGE 1: Langkah pertama Install dependencies terlebih dahulu
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# STAGE 2: Runner

FROM node:20-alpine as runner

WORKDIR /app

ENV NODE_ENV=production

# Copy node_modules yang sudah di install dari stage sebelumnya

COPY --from=deps /app/node_modules ./node_modules

# Copy seluruh isi code

COPY . .

# Buat user non-root demi keamanan (jangan jalankan app sebagai root)

RUN addgroup -S nodejs && adduser -S expressjs -G nodejs

USER expressjs

EXPOSE 3001

# Entrypoint script yang jalankan migration dulu baru start app

COPY --chown=expressjs:nodejs entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]