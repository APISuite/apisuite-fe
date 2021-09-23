import { GetMarkdownPageAction, GetMarkdownPageActionSuccess, GetMarkdownPageActionError } from "./types";

export const GET_MARKDOWN_PAGE = "markdown/GET_PAGE";
export const GET_MARKDOWN_PAGE_SUCCESS = "markdown/GET_PAGE_SUCCESS";
export const GET_MARKDOWN_PAGE_ERROR = "markdown/GET_PAGE_ERROR";

export function getMarkdownPage (payload: Omit<GetMarkdownPageAction, "type">) {
  return { type: GET_MARKDOWN_PAGE, ...payload };
}

export function getMarkdownPageSuccess (payload: Omit<GetMarkdownPageActionSuccess, "type">) {
  return { type: GET_MARKDOWN_PAGE_SUCCESS, ...payload };
}

export function getMarkdownPageError (payload: Omit<GetMarkdownPageActionError, "type">) {
  return { type: GET_MARKDOWN_PAGE_ERROR, ...payload };
}
