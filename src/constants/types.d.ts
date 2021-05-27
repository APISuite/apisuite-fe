import { Role } from "store/profile/types";

export interface RoleLevel {
  label: string,
  value: Role["name"],
  level: number,
}

export interface Roles {
  [name: string]: RoleLevel,
}
