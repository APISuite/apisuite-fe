import { RE_CAPTCHA_API_KEY } from "constants/global";

export enum ReCaptchaActions {
  login = "login",
  password = "password",
  register = "register",
}

export async function getReCAPTCHAToken(action: ReCaptchaActions) {
  if (window.grecaptcha) {
    return window.grecaptcha.execute(RE_CAPTCHA_API_KEY, { action });
  }

  return "";
}
