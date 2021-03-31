# APISuite Frontend

This is APISuite's core frontend repository.

## Set up

### Requirements

* Node.js v12.13.1
* Yarn

### Install dependencies

This package is part of a monorepo managed through [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Thus, to install all dependencies, run the following command from the monorepo's root folder:

    yarn

#### Handling private GitHub-hosted dependencies

Some dependencies (node modules) might be hosted in private GitHub repos. This might be the case when using UI extensions. 
In this case, you need to have your local machine and Git host (GitHub) set up with your SSH keys before running `yarn`. 
If you need help, read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Configuring your local environment

1. Copy the `.env.sample` file to `.env` and adapt it to your setup

## Run

To start a webpack development server that rebuilds the project on every change, run:

    npm run dev

To create a build:

    npm run build


Go to [http://localhost:3500](http://localhost:3500)

## Extending the APISuite Portal

The APISuite Portal can be extended through APISuite UI Extensions. For more details consult the [EXTENSIONS.md](EXTENSIONS.md) documentation.

# Troubleshooting

## Installation

## Session Cookies

In order for the login flow to work and be secure cookie are used and are blocked to specific domains. 
So to be able to run the app locally you need to edit you host file (`/etc/hosts`) and add the following: `127.0.0.1       localhost.develop.apisuite.io`.

Also edit the `webpack.config.dev.js` and change the host parameter to: `host: 'localhost.develop.apisuite.io',`. This should enable you to login properly.

### Permission denied (publickey)

```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

There's something wrong with your SSH Key setup. Read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

## Run-time

### Invalid Hook Call Warning

During run-time, in the browser, one might receive a React error related to having multiple react versions installed at the same time.

This might happen when manually installing UI extensions during development time after having installed the monorepo's dependencies with `yarn` in the project root. This initial setup adds `react` and `react-dom` to the root's `node_modules` folder. Installing the extension in a particular subproject might install `react` and `react-dom` in the subproject's local `node_modules` folder as well. During run-time, some some packages will use one `react` and some others the other `react`.

To fix this, run `npm install` locally which should install all dependencies under the local `node_modules`.
