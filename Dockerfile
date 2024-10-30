FROM oven/bun:latest AS bun

FROM bun AS builder
WORKDIR /app
COPY . ./
RUN bun install


FROM builder AS frontend-build
RUN bun run frontend:build


FROM builder AS worker-build
RUN bun run worker:build


FROM builder AS docker-helper-build
RUN bun run docker-helper:build:compile


FROM nginx:latest AS frontend

ENV PUBLIC_HTML_DIR=/usr/share/nginx/html
ENV DB_UPSTREAM_SERVER=""

COPY --from=frontend-build /app/dist/frontend ${PUBLIC_HTML_DIR}
COPY .docker/resources/nginx.conf /etc/nginx/nginx.conf.template

COPY --from=docker-helper-build /app/dist/bin/docker-helper /usr/bin/docker-helper
RUN chmod +x /usr/bin/docker-helper

COPY .docker/resources/nginx.sh /usr/bin/nginx.sh
RUN chmod +x /usr/bin/nginx.sh

ENTRYPOINT ["/usr/bin/nginx.sh"]
CMD ["-g", "daemon off;"]



FROM bun AS worker
COPY --from=worker-build /app/dist/worker /worker
RUN chmod +x /worker/index.js
ENTRYPOINT ["bun", "run", "/worker/index.js"]
CMD ["start"]
