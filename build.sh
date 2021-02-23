#!/usr/bin/env bash

. ./generate_envfile.sh

if [[ -f sandbox.config-${CIRCLE_BRANCH}.json ]]; then
  cp sandbox.config-${CIRCLE_BRANCH}.json sandbox.config.json
else
  cp sandbox.config-develop.json sandbox.config.json
fi


echo ${DOCKER_PASS} | docker login --username ${DOCKER_USER} --password-stdin

HASH=$(git rev-parse --short HEAD)

if [ "$CIRCLE_BRANCH" = "production" ]; then

  VERSION=$(cat package.json | grep version | head -1 | awk -F ": " '{ print $2 }' | sed 's/[",]//g')

  docker build \
    -t cloudokihub/apisuite-fe:$HASH \
    -t cloudokihub/apisuite-fe:latest \
    -t cloudokihub/apisuite-fe:$VERSION .
  docker push cloudokihub/apisuite-fe:$HASH
  docker push cloudokihub/apisuite-fe:latest
  docker push cloudokihub/apisuite-fe:$VERSION

  # Cloud image
  cp sandbox.config-cloud.json sandbox.config.json
  docker build \
    -t cloudokihub/apisuite-fe:cloud-$VERSION \
    -t cloudokihub/apisuite-fe:cloud-latest .

  docker push cloudokihub/apisuite-fe:cloud-$VERSION
  docker push cloudokihub/apisuite-fe:cloud-latest

else

  LATEST=dev-latest
  if [ "$CIRCLE_BRANCH" = "staging" ]; then
    LATEST=stg-latest
  fi

  docker build \
    -t cloudokihub/apisuite-fe:$HASH \
    -t cloudokihub/apisuite-fe:$LATEST .

  docker push cloudokihub/apisuite-fe:$HASH
  docker push cloudokihub/apisuite-fe:$LATEST

fi
