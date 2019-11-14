FROM node:12.8-slim

# Create app directory
WORKDIR /usr/src/app


RUN npm install -g browserify
RUN npm install -g yarn

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

RUN ulimit -n

# Bundle app source
COPY . .

RUN npm run build

RUN browserify ./dist/public/client.js -o ./dist/public/bundle.js 

EXPOSE 3000

CMD [ "node", "./dist/server.js" ]