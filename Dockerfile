FROM node:16
WORKDIR /home/backend/
COPY backend ./
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 4950 5000 5050