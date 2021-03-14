FROM node:14-alpine

WORKDIR /app

COPY ./dist ./dist
COPY ./data ./data
COPY ./node_modules ./node_modules

CMD [ "node", "./dist/index.js" ]