import { AppType } from "store/applications/types";

export interface AppTypesModalProps {
  open: boolean,
  showLogo: boolean,
  title: string,
  type?: AppType,
  onClose: () => void,
  onClick: (type: AppType | null) => void,
}

export interface TypeChipProps {
  color: "primary" | "secondary" | "default" | undefined,
  editable: boolean,
  type: AppType,
  onTypeSelected: (type: AppType) => void,
}
