
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  backLabel?: string,
  buttonDisabled: boolean,
  buttonLabel: string,
  children: React.ReactNode,
  closeRoute?: string,
  customBackButtonStyles?: string,
  customDisabledConfirmButtonStyles?: string,
  customEnabledConfirmButtonStyles?: string,
  error?: string | Error,
  handleBackClick?: (e: React.FormEvent<HTMLFormElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  loading: boolean,
  showBack?: boolean,
}
