FROM node:lts-alpine

WORKDIR /zmt-nasa

COPY package.json ./

COPY client/package.json client/
RUN npm run install-client --only=production

COPY server/package.json server/
RUN npm run install-server --only=production

COPY client/ client/
RUN npm run build-client

COPY server/ server/ 

USER node

CMD ["npm","run","deploy-cluster"]

EXPOSE 8000