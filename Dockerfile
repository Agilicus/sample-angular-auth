FROM node:14 as frontend
MAINTAINER dev@agilicus.com

COPY *.json /web/
COPY src /web/src/
WORKDIR /web

RUN npm ci && \
    ./node_modules/.bin/ng build --aot --subresourceIntegrity --outputHashing=all --prod=true

FROM cr.agilicus.com/open-source/openresty:v0.5.17
MAINTAINER dev@agilicus.com

COPY --from=frontend /web/dist/sample-angular-auth /app/

ENV HDR_CONTENT_SECURITY_POLICY="default-src 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' https://www.gravatar.com https://storage.googleapis.com www.googletagmanager.com https://www.google-analytics.com data:; font-src 'self' https://fonts.gstatic.com; connect-src *; script-src 'self' 'nonce-%s' https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com; frame-src 'self'; report-uri /.well-known/csp-violation-report-endpoint/;"

WORKDIR /app
USER openresty

