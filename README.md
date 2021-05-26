# APISuite Frontend

This is APISuite's core frontend repository.

## Set up

### Requirements

* Node.js >=v15.14.0

### Install dependencies

```bash
npm i
```

#### Handling private GitHub-hosted dependencies

Some dependencies (node modules) might be hosted in private GitHub repos. This might be the case when using UI extensions. 
In this case, you need to have your local machine and Git host (GitHub) set up with your SSH keys before running `npm install`. 
If you need help, read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

### Configuring your local environment

1. Copy the `.env.sample` file to `.env` and adapt it to your setup

## Run

To start a webpack development server that rebuilds the project on every change, run:

```bash
npm run dev
```

To create a build:

```bash
npm run build
```


Go to [https://localhost.develop.apisuite.io:9001](https://localhost.develop.apisuite.io:9001)

## Extending the APISuite Portal

The APISuite Portal can be extended through APISuite UI Extensions. For more details consult the [EXTENSIONS.md](EXTENSIONS.md) documentation.

# Troubleshooting

## Session Cookies

In order for the login flow to work and be secure cookie are used and are blocked to specific domains. 
So to be able to run the app locally you need to edit you host file (`/etc/hosts`) and add the following: `127.0.0.1       localhost.develop.apisuite.io`.

### Permission denied (publickey)

```
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

There's something wrong with your SSH Key setup. Read this [documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
