# Script for deployment.
FROM node:current-alpine3.10

RUN apt-get update -qq

RUN useradd -ms /bin/bash overlord

WORKDIR /app
RUN chmod -R 777 /app
COPY --chown=overlord:overlord . /app
RUN npm i
RUN npm run build
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "start"]
EXPOSE 3000
