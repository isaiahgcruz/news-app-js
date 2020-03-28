# build environment
FROM node:12.2.0-alpine as build

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

ENV REACT_APP_API_URL=/api

COPY package.json /client/package.json

RUN npm install --silent

COPY . /client

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /client/build /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]