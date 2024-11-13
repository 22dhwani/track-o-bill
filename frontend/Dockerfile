FROM node:20-alpine

WORKDIR /opt/app
COPY package*.json .
RUN npm ci
EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]