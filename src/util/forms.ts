export const isValidEmail = (email: any) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isValidURL = (url: any) => {
  /*
  The following regular expression was changed from

  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,=.]+$/
  (where 'http://' and 'https://' are optional)

  to

  /^(http:\/\/|https:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,=.]+$/
  (where 'http://' and 'https://' are mandatory)

  because the BE requires the presence of 'http://' or 'https://' in its
  URLs in order to create an app.
  */
  const re = /^(http:\/\/|https:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,=.]+$/;
  return re.test(String(url).toLowerCase());
};

export const isValidImage = async (imageURL: any) => {
  try {
    const requestResponseCors = await fetch(imageURL);

    if (requestResponseCors.status >= 100 && requestResponseCors.status < 400) {
      return !!requestResponseCors.ok;
    }
  } catch (e) {
    try {
      const requestResponseNoCors = await fetch(imageURL, {
        mode: "no-cors",
      });

      if (requestResponseNoCors.status >= 100 && requestResponseNoCors.status < 400) {
        return !!requestResponseNoCors.ok;
      }
    } catch (error) {
      return false;
    }
  }

  return false;
};

export const isValidPhoneNumber = (number: any) => {
  const re = /^(\+|00)[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,14}$/;
  return re.test(number);
};

export const isValidRecoveryCode = (code: any) => {
  const re = /^[\d\w]{5}-[\d\w]{5}$/;
  return re.test(code);
};

export const isValidPass = (pass: string) => {
  const passMinLength = 12;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const symbol = /[^a-zA-Z0-9]/g;
  const passLength = (pass.length >= passMinLength);
  return (uppercase.test(pass) && lowercase.test(pass) && symbol.test(pass) && passLength);
};

export const notEmpty = (value: string | number) => {
  if (typeof value === "number") return true;
  if (value.length > 0) return true;
  return false;
};

export const isValidName = (name: string) => {
  return (name && name.length > 0);
};

export const isValidAppMetaKey = (appMetaKey: string) => {
  return appMetaKey.length < 30 && /^meta_[A-Za-z0-9_]+$/.test(appMetaKey);
};
