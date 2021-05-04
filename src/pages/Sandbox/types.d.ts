import { SvgIconProps } from "components/SvgIcon/types";

export interface SlideConfig {
  /** key should be unique to leverage render optimization */
  title: string,
  subtitle: string,
  content?: string,
  button: string,
  link: string,
  btn: 1 | 2 | 3,
  img: string,
  disabled?: boolean,
}

export interface ListConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  desc: string,
  icon: SvgIconProps["name"],
}
