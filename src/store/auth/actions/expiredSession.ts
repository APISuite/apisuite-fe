import { ExpiredSessionAction } from "./types";

export const EXPIRED_SESSION = "auth/EXPIRED_SESSION";

export function handleSessionExpire (payload: Omit<ExpiredSessionAction, "type">) {
  return { type: EXPIRED_SESSION, ...payload };
}
