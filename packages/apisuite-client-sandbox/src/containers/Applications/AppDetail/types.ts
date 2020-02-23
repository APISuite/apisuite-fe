import { AppData, ApplicationRouteProps, Response } from '../types'
import { User } from 'containers/Auth/types'

export type AppDetailProps = ApplicationRouteProps & {
  user?: User,
  updateApp: (appData: AppData) => void,
  getAppDetails: (appId: number, userId: number) => void,
  deleteApp: (appId: number) => void,
  currentApp: AppData,
  resUpdate: Response,
  resDelete: Response,
}
