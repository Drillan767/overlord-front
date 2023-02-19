FROM node:18-alpine

ARG API_URL
ENV API_URL=${API_URL}

ARG GQL_HOST
ENV GQL_HOST=${GQL_HOST}

ARG URL
ENV URL=${URL}

ARG HCAPTCHA_SITEKEY
ENV HCAPTCHA_SITEKEY=${HCAPTCHA_SITEKEY}

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
