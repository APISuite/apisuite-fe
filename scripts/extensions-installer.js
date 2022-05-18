#!/usr/bin/env node

const fs = require('fs')
const packageJson = require('../package.json')

const TEMPLATE_IMPORT_PLACEHOLDER = '// EXTENSIONS-IMPORT-PLACEHOLDER'
const TEMPLATE_REGISTRATION_PLACEHOLDER = '// EXTENSIONS-REGISTRATION-PLACEHOLDER'

function getEnvironment () {
  // First look for the CLOUD or ENV setting in ../.env
  const dotEnvFile = fs.readFileSync(`${__dirname}/../.env`, 'utf8')

  const cloudMatch = dotEnvFile.match(/^CLOUD=(.*)/m)
  if (cloudMatch && cloudMatch[1] === 'true') {
    return 'cloud'
  }

  const envMatch = dotEnvFile.match(/^ENV=(.*)/m)

  if (envMatch) {
    return envMatch[1]
  }

  return process.env.CIRCLE_BRANCH || process.env.BRANCH
}

/**
 * Given a string, tries to interpolate given environment variables.
 *
 * For instance, given "This is $SOME value" string, it will replace the "$SOME"
 * variable with the value given in process.env.SOME.
 *
 * Based on: https://github.com/motdotla/dotenv-expand
 */
function interpolateEnvVars (envValue) {
  const environmentVariables = process.env

  const matches = envValue.match(/(.?\${?(?:[a-zA-Z0-9_]+)?}?)/g) || []

  return matches.reduce(function (newEnv, match) {
    const parts = /(.?)\${?([a-zA-Z0-9_]+)?}?/g.exec(match)
    const prefix = parts[1]

    let value, replacePart

    if (prefix === '\\') {
      replacePart = parts[0]
      value = replacePart.replace('\\$', '$')
    } else {
      const key = parts[2]
      replacePart = parts[0].substring(prefix.length)
      // process.env value 'wins' over .env file's value
      value = environmentVariables.hasOwnProperty(key) ? environmentVariables[key] : ''

      // Resolve recursive interpolations
      value = interpolateEnvVars(value)
    }

    return newEnv.replace(replacePart, value)
  }, envValue)
}

function loadEnvExtensionsConfig (environment) {
  let envExtensions
  const emptyExtensions = { extensions: [] }
  try {
    const envExtensionsString = fs.readFileSync(`${__dirname}/../extensions.${environment}.json`, 'utf8')
    envExtensions = JSON.parse(envExtensionsString)
  } catch (err) {
    // File not found
    return emptyExtensions
  }

  if (!envExtensions && !Array.isArray(envExtensions.extensions)) {
    // Empty or invalid file, nothing to do here
    return emptyExtensions
  }

  return envExtensions
}

function injectExtensionsIntoPackageJson (envExtensions) {
  envExtensions.extensions.forEach(extension => {
    packageJson.devDependencies = packageJson.devDependencies || {}
    packageJson.devDependencies[extension.name] = extension.version || extension.path
  })

  fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(packageJson, null, 2) + '\n')
}

function injectExtensionsIntoExtensionsTs (envExtensions) {
  const EXTENSIONS_TS_PATH = `${__dirname}/../extensions.template.ts`
  const extensionsTsTemplate = fs.readFileSync(EXTENSIONS_TS_PATH, 'utf8')

  const imports = []
  const registrations = []
  envExtensions.extensions.forEach(extension => {
    const extensionConfig = extension.config
      ? JSON.stringify(extension.config, null, 2)
      : ''
    imports.push(`import ${extension.className} from '${extension.name}'`)
    registrations.push(`instanceExtension(${extension.className}, ${extensionConfig}),`)
  })

  if (imports.length) {
    imports.unshift("import { instanceExtension } from 'util/extensionsParams'")
  }

  const importsString = imports.join('\n')
  const registrationString = interpolateEnvVars(registrations.join('\n'))

  const finalExtensionTs = extensionsTsTemplate
    .replace(
      TEMPLATE_IMPORT_PLACEHOLDER,
      `${importsString}`,
    )
    .replace(
      TEMPLATE_REGISTRATION_PLACEHOLDER,
      `${registrationString}`,
    )

  fs.writeFileSync(`${__dirname}/../extensions.ts`, finalExtensionTs)
}

const environment = getEnvironment()
const envExtensions = loadEnvExtensionsConfig(environment)
injectExtensionsIntoPackageJson(envExtensions)
injectExtensionsIntoExtensionsTs(envExtensions)
