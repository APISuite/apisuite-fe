export interface SvgIconProps extends React.HTMLAttributes<SVGSVGElement> {
  /** The width and height of the icon - it should be uniform */
  size?: number | string,
  viewBox?: string,
  /** The icon path name */
  name:
  | "autorenew"
  | "chevron-up"
  | "chevron-left-circle"
  | "chevron-right-circle"
  | "headset"
  | "airplane-landing"
  | "paw"
  | "infinity"
  | "human-pregnant"
  | "animation-play-outline"
  | "cloud-outline"
  | "account-multiple-plus-outline"
  | "account-multiple"
  | "fingerprint"
  | "usb"
  | "shield-check-outline"
  | "book-open"
  | "briefcase"
  | "fullscreen"
  | "key"
  | "earth"
  | "twitter"
  | "facebook"
  | "github"
  | "gitlab"
  | "linkedin"
  | "reddit"
  | "instagram"
  | "plus"
  | "close"
  | "dots-vrtical"
  | "circle"
  | "launch"
  | "cloud-upload"
  | "code"
  | "content-copy"
  | "logout",
  /** The fill to be applied to the vector */
  color?: string,
}

export interface BaseSvgIconProps extends SvgIconProps {
  children: React.FunctionComponent<InternalSvgIconProps>,
}

export interface InternalSvgIconProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number,
  height?: string | number,
  color?: string,
}

export interface CallableSvgIconProps extends InternalSvgIconProps {
  name: SvgIconProps["name"],
}

export interface IconPaths {
  [iconName: string]: string,
}
