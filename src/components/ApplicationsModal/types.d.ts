
import { ModalDetails } from "store/applications/types";
import { History } from "history";

export interface ApplicationsModalProps {
  allUserAppNames: string[],
  isModalOpen: boolean,
  modalDetails: ModalDetails,
  modalMode: string,
  toggleModal: () => void,
}

export type LocationHistory = History & {
  location: {
    state: {
      redirected?: boolean,
      appID?: string,
    },
  },
}