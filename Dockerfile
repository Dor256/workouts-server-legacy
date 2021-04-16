FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm start
