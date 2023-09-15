FROM oven/bun:1.0
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install
COPY prisma .
RUN bun run -b prisma:generate

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["bun", "run", "start"]



