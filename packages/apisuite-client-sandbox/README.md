# apisuite-client-sandbox

This project is the APISuite Portal front-end.

## Set up

### Requirements

* Node.js v12.13.1
* Yarn

### Install dependencies

This package is part of a monorepo managed through [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Thus, to install all dependencies, run the following command from the monorepo's root folder:

    yarn

#### Handling private GitHub-hosted dependencies

Some dependencies (node modules) might be hosted in private GitHub repos. This might be the case when using UI extensions. In this case, you need to have your local machine and Git host (GitHub) set up with your SSH keys before running `yarn`. If you need help, read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Configuring your local environment

1. Copy the `.env.sample` file to `.env` and adapt it to your setup
1. Copy one of the `sandbox.config-*.json` files to `sandbox.config.json` and adapt it to your setup

Note that the `sandbox.config.json` file is automatically created the first time you run/build the project if it doesn't already exist.

## Run

To start a webpack development server that rebuilds the project on every change, run:

    npm run dev

To create a build:

    npm run build

## Docker compose example for tests

You will need the `.env` and `cypress.env.json` files in the project root.

```yml
# docker-compose.yml
version: '3.6'
services:
  sandbox-client:
    build: .
    image: cloudoki/apisuite/sandbox/client
    ports:
      - "3500:8080"
```

run:

```bash
$ docker-compose up -d --build
```

Go to [http://localhost:3500](http://localhost:3500)

## Extending the APISuite Portal

The APISuite Portal can be extended through APISuite UI Extensions. For more details consult the [EXTENSIONS.md](EXTENSIONS.md) documentation.

# Troubleshooting

## Installation

### Permission denied (publickey)

```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

There's something wrong with your SSH Key setup. Read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
