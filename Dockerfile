FROM oven/bun:latest as builder
WORKDIR /app
COPY backend /app/backend
COPY frontend /app/frontend

RUN cd /app/backend && \
    bun i && bun run build && \
    bun run build:bin

RUN cd /app/frontend && \
    bun i && bun run build 

FROM ubuntu:latest
RUN apt-get update && apt-get install docker.io curl -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose
WORKDIR /app
COPY --from=builder /app/frontend/dist /app/web
COPY --from=builder /app/backend/single/bin /usr/local/bin/omah
RUN chmod +x /usr/local/bin/omah

EXPOSE ${PORT:-7000}
CMD ["omah"]