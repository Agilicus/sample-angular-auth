FROM node:12 as frontend
MAINTAINER dev@agilicus.com

COPY *.json /web/
COPY src /web/src/
WORKDIR /web

RUN npm ci && \
    ./node_modules/.bin/ng build --aot --subresourceIntegrity --outputHashing=all --prod=true

FROM cr.agilicus.com/open-source/openresty
MAINTAINER dev@agilicus.com

COPY --from=frontend /web/dist/sample-angular-auth /web/

RUN  adduser --disabled-password --gecos '' web \
  && touch /usr/local/openresty/nginx/logs/error.log /usr/local/openresty/nginx/logs/access.log \
  && mkdir -p /var/tmp/nginx \
  && chown web:web /usr/local/openresty/nginx/logs/*.log  /var/tmp/nginx

COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

WORKDIR /web
USER web

ENTRYPOINT [ "/usr/local/openresty/nginx/sbin/nginx", "-g", "daemon off;" ]
