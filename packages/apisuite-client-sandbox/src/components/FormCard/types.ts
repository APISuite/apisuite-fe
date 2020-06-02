
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonLabel: string,
  closeRoute?: string,
  buttonDisabled: boolean,
  loading: boolean,
  error?: string,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  children: React.ReactNode,
}
