import { ModalProps } from "@apisuite/fe-base";

export type OverlayProps = {
  showLogo: boolean,
  noTopBg?: boolean,
  title?: string,
  onClose: () => void,
} & ModalProps
