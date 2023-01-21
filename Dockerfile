FROM node:18-alpine

ARG api_url
ENV API_URL = ${api_url}

ARG gql_host
ENV GQL_HOST=${gql_host}

ARG url
ENV URL = ${url}

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN yarn install --frozen-lockfile --non-interactive \
    && yarn cache clean --all \
    && yarn build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
