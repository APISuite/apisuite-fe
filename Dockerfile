FROM cypress/base:ubuntu16-12.13.1 AS build

ARG ENV=dev
ARG SSH_PRIVATE_KEY

WORKDIR /build
COPY . /build
RUN mkdir /root/.ssh/ &&\
    echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa &&\
    chmod 600 /root/.ssh/id_rsa &&\
    touch /root/.ssh/known_hosts &&\
    ssh-keyscan github.com >> /root/.ssh/known_hosts
RUN node scripts/extensions-installer.js
RUN npm install -g yarn
RUN npm install
RUN npm run build

# This results in a single layer image
FROM nginx:1.17.3-alpine
COPY --from=build /build/dist /usr/share/nginx/apisuite-portal
COPY nginx/public.conf /etc/nginx/conf.d/default.conf
