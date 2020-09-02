#!/usr/bin/env bash

set -e

###################################################################
# Script Name : build_push_docker.sh
# Description	: Will create the necessary environment variables, \
#               identify the services to build (monorepo) and call docker compose to \
#               build and push for those services
# Args        : -
# Author      : Délio Amaral (C) 2019 - cloudoki
# Email       : delio@cloudoki.com
###################################################################

# Function to convert yaml to json with ruby
function yaml2json()
{
  ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load(ARGF))' $*
}

# Remove .env if exits
rm .env || true

# Login into docker hub
echo ${DOCKER_USER_PASS} | docker login --username ${DOCKER_USER_NAME} --password-stdin

# Create .env
touch .env

# Set docker repo
DOCKER_REPO=${DOCKER_REPO:-"cloudokihub/apisuite"}

# Set prefix filter to remove unwanted parts from project name/path
PREFIX_FILTER=${PREFIX_FILTER:-"apisuite-"}
SUFFIX_FILTER=${SUFFIX_FILTER:-""}

# Run common code
. ./common.sh

# Write envs to .env
echo "DOCKER_REPO=${DOCKER_REPO}" >> .env

# Create env vars with the version for each package and write to .env
for project in ${PROJECTS_LIST}; do
  PROJECT_PACKAGE_VERSION="develop"
  if [ "${CIRCLE_BRANCH}" != "develop" ]; then
    PROJECT_PACKAGE_VERSION=$(cat ../${ROOT_PROJECTS_FOLDER}/${project}/package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')
  fi
  echo "Creating the var for $(echo $project | tr '[:lower:]' '[:upper:]' | tr '-' '_')_TAG"
  CLEAN_PROJECT_PREFIX=${project#$PREFIX_FILTER}
  CLEAN_PROJECT_SUFFIX=${CLEAN_PROJECT_PREFIX%$SUFFIX_FILTER}
  echo "$(echo $project | tr '[:lower:]' '[:upper:]' | tr '-' '_')_TAG=${CLEAN_PROJECT_SUFFIX}-${PROJECT_PACKAGE_VERSION}" >> .env


  if [[ "${project}" == "apisuite-client-sandbox" ]]; then
    if [[ -f ../${ROOT_PROJECTS_FOLDER}/${project}/sandbox.config-${CIRCLE_BRANCH}.json ]]; then
      cp ../${ROOT_PROJECTS_FOLDER}/${project}/sandbox.config-${CIRCLE_BRANCH}.json ../${ROOT_PROJECTS_FOLDER}/${project}/sandbox.config.json
    else
      cp ../${ROOT_PROJECTS_FOLDER}/${project}/sandbox.config-develop.json ../${ROOT_PROJECTS_FOLDER}/${project}/sandbox.config.json
    fi
  fi
done

# Get the projects folder name to build
# Parse the ymal to json
PARSED_YAML=$(cat docker-compose.yaml | yaml2json)

for project in ${PROJECTS}; do
  # Remove the project from the array if exist
  CLEANED_PROJECTS_ARRAY=(${PROJECTS_AS_ARRAY[@]/#$project})

  # Compare the arrays sizes to see if theres a match (different sizes is a match)
  if [[ "${#PROJECTS_AS_ARRAY[@]}" != "${#CLEANED_PROJECTS_ARRAY[@]}" ]]; then
    SERVICE_NAME=$(echo $PARSED_YAML | jq -r ".services | to_entries[] | select (.value.build == \"../${ROOT_PROJECTS_FOLDER}/${project}\") | .key")
    echo "Will build [folder, service] -> [$project, $SERVICE_NAME]"
    DOCKER_SERVICES="$DOCKER_SERVICES $SERVICE_NAME"
  fi
done

# Build and push to docker registry
# docker-compose config
if [[ -n ${DOCKER_SERVICES// } ]]; then
  echo "Services to build: $DOCKER_SERVICES"
  # generate the env files for the packages
  . ./generate_packages_envfile.sh
  docker-compose build --build-arg $SSH_PRIVATE_KEY="$(echo $GITHUB_SSH_PRIVATE_KEY | base64 -d)" $DOCKER_SERVICES
  docker-compose push $DOCKER_SERVICES
else
  echo "No services listed will not build and push"
  if [[ "$FORCE_BUILD" == "true" ]]; then
    echo "Will build anyways."
    . ./generate_packages_envfile.sh
    docker-compose build --build-arg $SSH_PRIVATE_KEY="$(echo $GITHUB_SSH_PRIVATE_KEY | base64 -d)"
    docker-compose push
  fi
fi

# Logout from docker
docker logout
