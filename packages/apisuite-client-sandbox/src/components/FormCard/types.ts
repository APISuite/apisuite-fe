
export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string,
  buttonLabel: string,
  closeRoute: string,
  buttonDisabled: boolean,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  formMsg?: JSX.Element,
  children: React.ReactNodeArray,
}
