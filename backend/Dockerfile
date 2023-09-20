FROM oven/bun:1.0
WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# TODO: Get back to this when this is solved:
# https://github.com/oven-sh/bun/issues/4848
# Install nodejs using n
ARG NODE_VERSION=18
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

COPY package.json bun.lockb ./
RUN bun install
COPY prisma .
RUN bun run prisma:generate

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["bun", "run", "start"]



