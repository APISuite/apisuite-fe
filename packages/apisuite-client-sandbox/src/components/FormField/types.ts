import { StandardTextFieldProps } from '@material-ui/core/TextField'
import { InputProps as StandardInputProps } from '@material-ui/core/Input'
export interface FormFieldProps extends StandardTextFieldProps {
  onBlur?: StandardInputProps['onBlur'],
  onFocus?: StandardInputProps['onFocus'],
  variant?: any,
  InputProps?: Partial<StandardInputProps>,
  inputProps?: StandardInputProps['inputProps'],
  name: string,
  handleChange?: (err: any) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  showErrors?: boolean,
  rules?: Rule[],
  errorPlacing?: 'bottom' | 'top' | 'left' | 'right',
}

export type Rule = {
  message: string,
  rule: boolean,
}
