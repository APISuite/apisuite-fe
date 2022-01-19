export interface SelectProps {
  className?: string,
  customCloseIcon?: any,
  customOpenIcon?: any,
  disabled?: boolean,
  fieldLabel?: string,
  onChange?: (event: React.ChangeEvent<any>, value: any) => void,
  options: SelectOption[],
  selected?: SelectOption,
}

export interface SelectOption {
  group: string,
  label: string,
  value: any,
}
