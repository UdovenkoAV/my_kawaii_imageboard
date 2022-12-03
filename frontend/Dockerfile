FROM node:19-alpine3.15 as build

WORKDIR /app/frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --silent
COPY ./ ./
RUN npm run build

FROM nginx:latest
 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./.nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /app/frontend/build /usr/share/nginx/html



