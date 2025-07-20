FROM node:lts-alpine3.22 as base

WORKDIR /src

# Build
FROM base as build

COPY --link package.json yarn.lock .

RUN yarn install --frozen-lockfile

COPY --link . .

RUN npx nuxi generate && yarn build

ENV NODE_ENV=production
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]