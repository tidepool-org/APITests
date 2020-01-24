### Stage 0 - Base image
FROM node:13.7.0-alpine as base
WORKDIR /app
RUN apk --no-cache update && \
    apk --no-cache upgrade && \
    apk add --no-cache --virtual .build-dependencies python make g++ && \
    mkdir -p node_modules && chown -R node:node .

### Stage 1 - Create cached `node_modules`
# Only rebuild layer if `package.json` has changed
FROM base as dependencies
COPY package.json .
RUN \
  # Build and separate all dependancies required for production
  npm install --production && cp -R node_modules production_node_modules \
  # Build all modules, including `devDependancies`
  && npm install

### Stage 2 - Development root with Chromium installed for unit tests
FROM base as development
ENV NODE_ENV=development
# Copy all `node_modules` dependencies
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules
# Copy source files
COPY --chown=node:node . .
USER node
CMD ["npm", "start"]

### Stage 3 - Serve production-ready release
FROM base as production
ENV NODE_ENV=production

# Copy only `node_modules` needed to run the server
COPY --from=dependencies /app/production_node_modules ./node_modules
# Copy source files
COPY --chown=node:node . .
USER node
EXPOSE 8080
ENV PATH="node_modules/.bin:$PATH"
CMD ["node", "-r", "esm", "app.js"]
