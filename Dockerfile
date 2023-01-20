FROM node:18

WORKDIR /scraper-service
COPY package*.json ./
COPY tsconfig.json ./
COPY src /scraper-service/src

RUN ls -a

RUN npm install
RUN npm install -g pm2
RUN npm run build

EXPOSE 81

CMD ["pm2-runtime", "build/server.js"]
