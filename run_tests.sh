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

cp "sandbox.config-$CIRCLE_BRANCH.json" "sandbox.config.json"
npm install
npm run pretest
# npm run test
rm sandbox.config.json
