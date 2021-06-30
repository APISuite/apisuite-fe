#!/usr/bin/env bash

set -e

###################################################################
# Script Name : run_test.sh
# Description	: Will run the projects tests
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

. ./generate_envfile.sh

. ./install_dependencies.sh

echo 127.0.0.1 localhost.develop.apisuite.io | sudo tee -a /etc/hosts

sudo cat /etc/hosts
