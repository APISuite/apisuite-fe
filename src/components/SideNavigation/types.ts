export interface TabProps {
  active?: boolean,
  disabled?: boolean,
  label: string,
  route: string,
}

export interface TabMenus {
  [key: string]: TabProps[],
}

export interface SideNavigationProps {
  menuEntries: TabProps[],
}
