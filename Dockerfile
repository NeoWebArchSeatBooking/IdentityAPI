FROM node:18-alpine3.18

WORKDIR /opt/app

COPY package* .
COPY *.js .
COPY swagger.json .

RUN npm ci --omit=dev

EXPOSE 80
CMD [ "npm", "start" ]