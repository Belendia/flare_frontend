FROM node:10-alpine as builder
#RUN npm install -g yarn
RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*
WORKDIR /app
COPY ./flare_frontend/package.json ./flare_frontend/yarn.lock ./
RUN yarn
COPY ./flare_frontend/. .
RUN yarn run build


FROM nginx:latest
LABEL maintainer="Belendia Serda belendia@gmail.com"

ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./flare_backend/staticfiles /usr/share/nginx/html/static/staticfiles
EXPOSE 8999
CMD ["nginx", "-g", "daemon off;"]