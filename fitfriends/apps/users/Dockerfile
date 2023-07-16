FROM node:18.16-alpine
WORKDIR /opt/fitfriends-users
COPY ./dist/apps/users .
RUN npm install --omit=dev
CMD ["node", "./main.js"]
