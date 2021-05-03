
export interface GenericSignUpFormProps {
  next: (firstInput: string, secondInput?: string) => void,
  back: () => void,
  error: string,
}
