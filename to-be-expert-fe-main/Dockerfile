FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

# Install serve globally
RUN yarn global add serve

COPY . .

RUN yarn build

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3001"]
