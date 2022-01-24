#!/usr/bin/env bash

set -e

###################################################################
# Script Name : generate_envfile.sh
# Description	: Will get the env vars and put them in a env file for frontend builds.
# Args        : -
# Author      : Délio Amaral (C) 2020 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

echo "
ENV=dev
CLOUD=false
API_URL=${API_URL}
RE_CAPTCHA_API_KEY=${RE_CAPTCHA_API_KEY}
MARKETPLACE_API_URL=${MARKETPLACE_API_URL}
BILLING_API_URL=${BILLING_API_URL}
SUPPORT_URL=${SUPPORT_URL_DEV}" > .env

echo "$EXTENSIONS_DEFAULT" | base64 --decode > extensions.dev.json
