import { AppData } from 'containers/Applications/types'
import { ApiDocs, APIVersion } from 'containers/Subscriptions/types'

export default interface SubscriptionsModalProps {
  allUserApps: AppData[],
  apisByName: APIData[],
  isModalOpen: boolean,
  requestAPIAccessAction: (appId: number) => void,
  toggleModal: () => void,
}

export interface APIData {
  apps: {
    appId: number,
    appName: string,
  }[],
  description: ApiDocs | undefined,
  name: string,
  versions: APIVersion[],
}
