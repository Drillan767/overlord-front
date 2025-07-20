FROM node:22-alpine AS base

WORKDIR /src

# Build
FROM base AS build

COPY --link package.json yarn.lock ./

RUN apk add --no-cache curl && \
    yarn install --frozen-lockfile

COPY --link . .

RUN yarn build

# Run
FROM base

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY --from=build /src/.output /src/.output

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
