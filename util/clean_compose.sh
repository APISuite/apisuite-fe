#!/usr/bin/env bash

set -e

###################################################################
# Script Name : clean_compose.sh
# Description	: Will clean the docker compose file and comment the build line
#               Will detect the env we are deploying to.
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

# remove if exists or create a docker compose file
rm docker-compose.yml || touch docker-compose.yml

# read and filter the unwanted lines
while IFS= read -r line; do
  # if value of $var starts with #, ignore it
  [[ "$(echo "$line" | tr -d '[:space:]')" =~ ^\#.* ]] && continue

  # if value of $var starts with build, comment it
  if [[ "$(echo "$line" | tr -d '[:space:]')" =~ ^build.* ]]; then
    echo "# $line" >> docker-compose.yml
  else
    echo "$line" >> docker-compose.yml
  fi
done < docker-compose.yaml

# Map branche name to the environment
## Default environment is develop
APISUITE_ENVIRONMENT=dev

if [[ $CIRCLE_BRANCH =~ develop$ ]]; then
  APISUITE_ENVIRONMENT="dev";
elif [[ $CIRCLE_BRANCH =~ [-]*rc[0-9]*$ ]]; then
  APISUITE_ENVIRONMENT="stg";
elif [[ $CIRCLE_BRANCH =~ master$ ]]; then
  APISUITE_ENVIRONMENT="prod";
fi

echo "Set environment to $APISUITE_ENVIRONMENT"

# Write api environment to file so it can be exported in the server
rm environment || true
touch environment
echo "APISUITE_ENVIRONMENT=$APISUITE_ENVIRONMENT" > environment
