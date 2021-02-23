#!/usr/bin/env bash

set -e

###################################################################
# Script Name : generate_packages_envfile.sh
# Description	: Will get the env vars and put them in a env file for frontend builds.
# Args        : -
# Author      : Délio Amaral (C) 2020 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

if [ "$CIRCLE_BRANCH" = "develop" ]; then
    echo "ENV=dev
CLOUD=${CLOUD_BUILD}
AUTH_URL=${AUTH_URL_DEV}
API_URL=${API_URL_DEV}
APP_URL=${APP_URL_DEV}
SUPPORT_URL=${SUPPORT_URL_DEV}
LOGIN_PORT=${LOGIN_PORT_DEV}
THEME=
SIGNUP_PORT=${SIGNUP_PORT_DEV}" > .env

elif [ "$CIRCLE_BRANCH" = "staging" ]; then

    echo "ENV=stg
CLOUD=${CLOUD_BUILD}
AUTH_URL=${AUTH_URL_STG}
API_URL=${API_URL_STG}
APP_URL=${APP_URL_STG}
SUPPORT_URL=${SUPPORT_URL_STG}
LOGIN_PORT=${LOGIN_PORT_STG}
THEME=
SIGNUP_PORT=${SIGNUP_PORT_STG}" > .env

elif [ "$CIRCLE_BRANCH" = "production" ]; then

    echo "ENV=prod
CLOUD=${CLOUD_BUILD}
AUTH_URL=${AUTH_URL_PROD}
API_URL=${API_URL_PROD}
APP_URL=${APP_URL_PROD}
SUPPORT_URL=${SUPPORT_URL_PROD}
LOGIN_PORT=${LOGIN_PORT_PROD}
THEME=
SIGNUP_PORT=${SIGNUP_PORT_PROD}" > .env

fi
