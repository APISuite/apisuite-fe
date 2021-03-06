
import { AppData, CreateAppActionData, ModalDetails, UpdateAppActionData } from 'containers/Applications/types'

import { SettingsStore } from 'containers/Settings/types'

export default interface ApplicationsModalProps {
  allUserAppNames: string[],
  createAppAction: (appData: CreateAppActionData) => void,
  deleteAppAction: (appId: number, orgId?: number) => void,
  getUserAppAction: (appId: number, userId: number) => void,
  isModalOpen: boolean,
  modalDetails: ModalDetails,
  modalMode: string,
  mostRecentlySelectedAppDetails: AppData,
  settings: SettingsStore,
  toggleModal: () => void,
  updateAppAction: (appData: UpdateAppActionData) => void,
}
