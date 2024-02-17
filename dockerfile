FROM node:16
COPY . /app/
WORKDIR /app
RUN npm install
EXPOSE 3001
CMD ["npm","run","serve"]