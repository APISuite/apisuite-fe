export interface RadioBoxProps {
  description?: string,
  disabled?: boolean,
  isChecked: () => boolean,
  label: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  value: unknown,
}
