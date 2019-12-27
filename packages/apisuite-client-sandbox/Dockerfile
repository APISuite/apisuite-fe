FROM cypress/base:ubuntu16-12.13.1 AS build

WORKDIR /build
COPY . /build
RUN npm install -g yarn
RUN yarn install
RUN yarn run build

# This results in a single layer image
FROM nginx:1.17.3-alpine
COPY --from=build /build/dist /usr/share/nginx/apisuite-client-sandbox
COPY ./nginx/public.conf /etc/nginx/conf.d/default.conf
