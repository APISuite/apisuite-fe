export type GetMarkdownPageResponse = {
  id: number,
  locale: string,
  content: string,
  updatedAt: string,
  createdAt: string,
}

export type MarkdownPageStore = {
  content: string,
  isRequesting: boolean,
  error?: string,
}
