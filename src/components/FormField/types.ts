import { StandardTextFieldProps, InputProps as StandardInputProps } from '@apisuite/fe-base'
export interface FormFieldProps extends StandardTextFieldProps {
  onBlur?: StandardInputProps['onBlur'],
  onFocus?: StandardInputProps['onFocus'],
  variant?: any,
  InputProps?: Partial<StandardInputProps>,
  inputProps?: StandardInputProps['inputProps'],
  onChange?: any,
  showErrors?: boolean,
  rules?: Rule[],
  errorPlacing?: 'bottom' | 'top' | 'left' | 'right',
}

export type Rule = {
  message: string,
  rule: boolean,
}

export interface FormFieldEvent {
  target: {
    name: string,
    value: string,
  },
}
