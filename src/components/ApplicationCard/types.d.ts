export interface ApplicationCardProps {
  media?: JSX.Element,
  cardContent?: string | JSX.Element,
  children?: React.ReactNode,
  className?: string,
  contentStyle?: string,
  icon?: string,
  onClick?: () => void,
}
