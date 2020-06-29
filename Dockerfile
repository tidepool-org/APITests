FROM node:14.4.0-alpine

WORKDIR /app/

COPY . .

RUN npm ci
