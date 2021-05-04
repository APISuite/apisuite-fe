
import { ModalDetails } from "store/applications/types";

export interface ApplicationsModalProps {
  allUserAppNames: string[],
  isModalOpen: boolean,
  modalDetails: ModalDetails,
  modalMode: string,
  toggleModal: () => void,
}
