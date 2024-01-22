FROM node:lts-alpine
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://johnedmondson83:Password@cluster0.zliwnea.mongodb.net/SolarTilt
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
