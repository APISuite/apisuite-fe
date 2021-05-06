#!/usr/bin/env bash

set -e

###################################################################
# Script Name : generate_envfile.sh
# Description	: Will get the env vars and put them in a env file for frontend builds.
# Args        : -
# Author      : Délio Amaral (C) 2020 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

if [ "$CIRCLE_BRANCH" = "staging" ]; then

    echo "ENV=stg
CLOUD=${CLOUD_BUILD}
API_URL=${API_URL_STG}
SUPPORT_URL=${SUPPORT_URL_STG}" > .env

elif [ "$CIRCLE_BRANCH" = "production" ]; then

    echo "ENV=prod
CLOUD=true
API_URL=${API_URL_PROD}
SUPPORT_URL=${SUPPORT_URL_PROD}" > .env

else

  echo "ENV=dev
CLOUD=${CLOUD_BUILD}
API_URL=${API_URL_DEV}
SUPPORT_URL=${SUPPORT_URL_DEV}" > .env


fi
