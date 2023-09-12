FROM oven/bun:1.0
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

ENV PORT=4000
EXPOSE 4000
CMD ["bun", "start"]



