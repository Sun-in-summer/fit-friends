FROM node:18.16-alpine
WORKDIR /opt/fitfriends-notify
COPY ./dist/apps/notify/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/notify .
CMD ["node", "./main.js"]
