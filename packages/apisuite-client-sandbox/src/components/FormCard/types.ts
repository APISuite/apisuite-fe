
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  buttonLabel: string,
  closeRoute: string,
  buttonDisabled: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  formMsg: string,
  success: boolean,
  children: React.ReactNodeArray,
}
