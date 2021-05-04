export interface RoleLevel {
  label: string,
  value: string,
  level: number,
}

export interface Roles {
  [name: string]: RoleLevel,
}
