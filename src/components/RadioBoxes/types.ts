import { RadioGroupProps } from '@apisuite/fe-base'

export interface RadioBoxesProps {
  options: RadioBoxesOption[],
  selected: any,
  onChange?: RadioGroupProps['onChange'],
}

export interface RadioBoxesOption {
  label: string,
  desc: string,
  value: any,
  disabled: boolean,
  checked: boolean,
}
