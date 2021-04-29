export type InvitationFormProps = {
  isLogged?: boolean,
  sso: string[]|undefined,
}

export type InvitationDetails = {
  organization: string,
  email: string,
  token?: string,
}
