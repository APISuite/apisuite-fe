import { AuthStore } from "store/auth/types";
export interface FooterProps {
  auth: AuthStore,
}

export type MenuSection = {
  title: string,
  entries: Array<{
    label: string,
    route?: string,
  }>,
}

export type MenuSections = {
  [key: string]: MenuSection,
}
