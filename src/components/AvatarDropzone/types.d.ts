export interface AvatarDropzoneProps {
  accept?: string,
  helperText?: string,
  image?: string,
  maxSize?: number,
  onFileLoaded: (image: string) => void,
  onDeletePressed: () => void,
}
