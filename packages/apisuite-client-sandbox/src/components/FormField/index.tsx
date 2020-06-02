export const isValidEmail = (email: any) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export const isValidURL = (url: any) => {
  const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
  return re.test(String(url).toLowerCase())
}

export const isValidPhoneNumber = (number: any) => {
  const re = /^(\+|00)[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,14}$/
  return re.test(number)
}

export const isValidRecoveryCode = (code: any) => {
  const re = /^[\d\w]{5}-[\d\w]{5}$/
  return re.test(code)
}

export const isValidPass = (pass: string) => {
  const passMinLength = 12
  const uppercase = /[A-Z]/
  const lowercase = /[a-z]/
  const symbol = /[\W]{1,}/
  const passLength = (pass.length >= passMinLength)
  return (uppercase.test(pass) && lowercase.test(pass) && symbol.test(pass) && passLength)
}

export const isRequired = (value: string | number) => {
  if (typeof value === 'number') return true
  if (value.length > 0) return true
  return false
}

export const isValidName = (name: string) => {
  return (name && name.length > 0)
}

export const parseErrors = (target: any, errors: any, stateErrors: any) => {
  const newStateErrors = [...stateErrors]
  if (errors && errors.length) {
    if (newStateErrors.indexOf(target.name) < 0) {
      newStateErrors.push(target.name)
    }
  } else if (errors && !errors.length) {
    if (newStateErrors.indexOf(target.name) >= 0) {
      newStateErrors.splice(newStateErrors.indexOf(target.name), 1)
    }
  }
  return newStateErrors
}

export { default } from './FormField'
