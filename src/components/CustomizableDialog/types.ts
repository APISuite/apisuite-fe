import { DialogProps } from '@apisuite/fe-base'

export interface CustomizableDialogProps extends DialogProps {
  // Props passed by the 'calling' component to be added below
  cancelButtonLabel?: string,
  cancelButtonProps?: {
    [key: string]: any,
  },
  closeDialogCallback?: (...args: any[]) => any,
  confirmButtonCallback: (...args: any[]) => any,
  confirmButtonLabel?: string,
  confirmButtonProps?: {
    [key: string]: any,
  },
  open: boolean,
  openDialogCallback?: (...args: any[]) => any,
  optionalTitleIcon?: 'info' | 'warning',
  providedDialogActions?: {
    [key: string]: any,
  },
  providedDialogContent?: any,
  providedSubText?: string,
  providedText: string,
  providedTitle: string,

  // 'mapStateToProps' props (i.e., coming from the app's Redux 'store') to be added below (if any)
}
