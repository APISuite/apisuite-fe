export interface MediaProps {
  onFileLoaded: (files: File[]) => void,
  onDeletePressed: (filename: string) => void,
  images?: string[],
  accept?: string,
  helperText?: string,
}
