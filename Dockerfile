FROM node:10-alpine as builder
#RUN npm install -g yarn
WORKDIR /app
COPY ./ussd_fe/package.json ./ussd_fe/yarn.lock ./
RUN yarn
COPY ./ussd_fe/. .
RUN yarn run build


FROM nginx:latest
LABEL maintainer="Belendia Serda belendia@gmail.com"

ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./ussd_be/staticfiles /usr/share/nginx/html/static/staticfiles
EXPOSE 8999
CMD ["nginx", "-g", "daemon off;"]