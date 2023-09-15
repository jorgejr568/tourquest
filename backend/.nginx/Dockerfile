FROM nginx:1.18-alpine
WORKDIR /app

ARG HTTP_ADDRESS="http://backend:8000"
ARG WS_ADDRESS="http://backend:8001"

COPY default.conf .
RUN sed -i "s|HTTP_ADDRESS|${HTTP_ADDRESS}|g" default.conf
RUN sed -i "s|WS_ADDRESS|${WS_ADDRESS}|g" default.conf

RUN rm /etc/nginx/conf.d/default.conf
RUN mv default.conf /etc/nginx/conf.d/default.conf

RUN nginx -t

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]