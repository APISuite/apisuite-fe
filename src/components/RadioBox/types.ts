export interface RadioBoxProps {
  description?: string,
  disabled?: boolean,
  isChecked: () => boolean,
  label: string,
  value: unknown,
  onClick?: React.MouseEventHandler<HTMLElement>,
}
