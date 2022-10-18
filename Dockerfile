FROM node:18-slim
LABEL maintainer="martins"

COPY ./app /app

WORKDIR /app

EXPOSE 8010

RUN npm install
