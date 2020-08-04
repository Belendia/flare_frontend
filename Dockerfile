FROM node:10-alpine as builder
WORKDIR /app
COPY ./ussd_fe/package.json ./ussd_fe/package-lock.json ./
RUN npm install
COPY ./ussd_fe/. .
RUN npm run build


FROM nginx:latest
LABEL maintainer="Belendia Serda belendia@gmail.com"

ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./ussd_be/staticfiles /usr/share/nginx/html/static/staticfiles
EXPOSE 8999
CMD ["nginx", "-g", "daemon off;"]