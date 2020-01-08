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

export CI=true
export CIRCLECI=true
export CIRCLE_BRANCH=develop
export CIRCLE_BUILD_NUM=91
export CIRCLE_BUILD_URL=https://circleci.com/gh/Cloudoki/APISuite/91
export CIRCLE_COMPARE_URL=
export CIRCLE_JOB=build
export CIRCLE_NODE_INDEX=0
export CIRCLE_NODE_TOTAL=1
export CIRCLE_PREVIOUS_BUILD_NUM=90
export CIRCLE_PROJECT_REPONAME=APISuite
export CIRCLE_PROJECT_USERNAME=Cloudoki
export CIRCLE_REPOSITORY_URL=git@github.com:Cloudoki/APISuite.git
export CIRCLE_SHA1=bd30f3432228f499bb6bc8418da43982c21dcaa3
export CIRCLE_SHELL_ENV=/tmp/.bash_env-5e16006c28d1c239373d4fd9-0-build
export CIRCLE_STAGE=build
export CIRCLE_USERNAME=a31859
export CIRCLE_WORKFLOW_ID=9a956048-86ba-436a-aac0-9cd461ae266a
export CIRCLE_WORKFLOW_JOB_ID=3f2f5fdd-8287-4036-8dac-af16268664dc
export CIRCLE_WORKFLOW_UPSTREAM_JOB_IDS=f41385db-d3d2-4f68-8c5e-98e2e9ab9aa3
export CIRCLE_WORKFLOW_WORKSPACE_ID=9a956048-86ba-436a-aac0-9cd461ae266a
export CIRCLE_WORKING_DIRECTORY=~/apisuite
DOCKER_USER_PASS="FeESun&CxC59%wVjaHRB#Fhetfu@#s*3H6@^McZZgS&dV"
DOCKER_USER_NAME="delioamaral"


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
  echo "$(echo $project | tr '[:lower:]' '[:upper:]' | tr '-' '_')_TAG=${project}-${PROJECT_PACKAGE_VERSION}" >> .env
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
if [[ -n ${DOCKER_SERVICES// } ]]; then
  echo "Services to build: $DOCKER_SERVICES"
else
  echo "No services listed will build all"
fi
docker-compose config
docker-compose build $DOCKER_SERVICES
# docker-compose push $DOCKER_SERVICES

# Logout from docker
# docker logout
