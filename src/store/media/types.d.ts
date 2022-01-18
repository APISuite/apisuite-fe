export type FileData = {
  file: string,
  url: string,
}
export type FileErrorData = {
  file: string,
  error: string,
}

export type UploadMediaResponse = {
  savedObjects: FileData[],
  errors: FileErrorData[],
}

export type MediaStore = {
  media: UploadMediaResponse,
  isRequesting: boolean,
}
