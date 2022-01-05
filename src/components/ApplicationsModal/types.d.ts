
import { ModalDetails } from "store/applications/types";

export interface ApplicationsModalProps {
  isModalOpen: boolean,
  modalDetails: ModalDetails,
  modalMode: string,
  toggleModal: () => void,
}
