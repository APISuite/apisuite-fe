import { GetMarkdownPageResponse } from "../types";
import { GET_MARKDOWN_PAGE, GET_MARKDOWN_PAGE_SUCCESS, GET_MARKDOWN_PAGE_ERROR } from "./getMarkdownPage";

export type MarkdownPageActions = GetMarkdownPageAction | GetMarkdownPageActionSuccess | GetMarkdownPageActionError;

export type GetMarkdownPageAction = {
  type: typeof GET_MARKDOWN_PAGE,
  page: string,
}

export type GetMarkdownPageActionSuccess = {
  type: typeof GET_MARKDOWN_PAGE_SUCCESS,
  content: GetMarkdownPageResponse["content"],
}

export type GetMarkdownPageActionError = {
  type: typeof GET_MARKDOWN_PAGE_ERROR,
  error: string,
}
