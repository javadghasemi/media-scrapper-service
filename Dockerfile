FROM node:18

WORKDIR /scraper-service
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 81

CMD ["npm", "run", "dev"]