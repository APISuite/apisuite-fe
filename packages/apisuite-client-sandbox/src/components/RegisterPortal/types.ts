import { Action } from 'redux'

export interface RegisterPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  registerUser: (userData: UserData) => void,
  errorMsg: string,
  success: boolean,
}

export interface UserData {
  name: string,
  email: string,
  password: string,
}

export interface RegisterAction extends Action {
  type: 'REGISTER_USER',
  userData: UserData,
}

export interface RegisterStore {
  error: string,
  success: boolean,
}
