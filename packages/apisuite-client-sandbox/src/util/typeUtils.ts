export type ReturnNestedType<T> = T[keyof T] extends (...args: any) => infer R ? R : never
