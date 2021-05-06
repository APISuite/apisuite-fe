#!/usr/bin/env bash

set -e

###################################################################
# Script Name : run_test.sh
# Description	: Will run the projects tests
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

# . ./install_dependencies.sh

CONFIG=develop

if [[ "$CIRCLE_BRANCH" = "staging" || "$CIRCLE_BRANCH" = "production" ]]; then
  CONFIG=$CIRCLE_BRANCH
fi

echo "127.0.0.1 localhost.develop.apisuite.io" >> /etc/hosts

npm install
npm run test
