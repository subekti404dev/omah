FROM node:18.18.2 as builder
WORKDIR /app
COPY backend /app/backend
COPY frontend /app/frontend
RUN npm install -g pnpm
RUN cd /app/backend && \
    pnpm i && pnpm run build

RUN cd /app/frontend && \
    pnpm i && pnpm run build 

FROM node:18.18.2
RUN apt-get update && apt-get install docker.io curl -y && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
RUN curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose
WORKDIR /app
COPY --from=builder /app/frontend/dist /app/web
COPY --from=builder /app/backend/single/index.cjs /app/index.cjs
COPY /scripts/run.sh /usr/local/bin/omah
RUN chmod +x /usr/local/bin/omah

EXPOSE ${PORT:-7000}
CMD ["omah"]