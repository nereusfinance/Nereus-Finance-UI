FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/
COPY ./build /usr/share/nginx/html/

ARG NGINX_MODE=prod
COPY robots.txt.$NGINX_MODE /usr/share/nginx/html/robots.txt
