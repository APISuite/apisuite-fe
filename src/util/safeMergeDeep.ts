import isObject from './isObject'

export function safeMergeDeep<T extends Record<any, any>> (target: T, source: Partial<T>) {
  const copy: T = { ...target }

  for (const key in source) {
    if (copy.hasOwnProperty(key)) {
      if (isObject(copy[key])) {
        if (isObject(source[key])) {
          copy[key] = safeMergeDeep<any>(copy[key], source[key]!)
        }

        continue
      }

      if (source[key]) {
        copy[key] = source[key]!
      }
    }
  }

  return copy
}
