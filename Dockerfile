FROM node:lts-alpine

WORKDIR /zmt-nasa

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
RUN npm run install-server --only=production

COPY client/ client/
COPY server/ server/
 
RUN npm run build-client

USER node

ENV CI=true
CMD ["npm","run","cluster"]

EXPOSE 8000