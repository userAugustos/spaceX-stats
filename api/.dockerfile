FROM node:18

WORKDIR /spaceX

COPY package*.json ./

RUN pnpm i

EXPOSE 3030
# copies all of our project code into the container

COPY . .

ENV NODE_PATH=./dist