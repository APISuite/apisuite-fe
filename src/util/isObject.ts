/** helper to assert object types */
export default function isObject (val: unknown) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}
