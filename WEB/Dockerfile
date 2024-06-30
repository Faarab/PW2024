
FROM node:20-alpine as build


WORKDIR /WEB

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine


COPY --from=build /WEB/dist /usr/share/nginx/html

EXPOSE 80

# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
