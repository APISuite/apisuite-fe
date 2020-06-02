export const decodeBase64 = (value?: string) => {
  try {
    if (value) return atob(value)
  } catch {
    return ''
  }
  return ''
}
