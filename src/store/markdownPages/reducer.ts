import update from "immutability-helper";

import { MarkdownPageActions } from "./actions/types";
import { GET_MARKDOWN_PAGE, GET_MARKDOWN_PAGE_ERROR, GET_MARKDOWN_PAGE_SUCCESS } from "./actions/getMarkdownPage";
import { MarkdownPageStore } from "./types";

const initialState: MarkdownPageStore = {
  content: "",
  isRequesting: false,
  error: undefined,
};

export default function profileReducer (
  state = initialState,
  action: MarkdownPageActions,
): MarkdownPageStore {
  switch (action.type) {
    case GET_MARKDOWN_PAGE: {
      return update(state, {
        isRequesting: { $set: true },
      });
    }

    case GET_MARKDOWN_PAGE_SUCCESS: {
      return update(state, {
        content: { $set: action.content },
        isRequesting: { $set: false },
        error: { $set: undefined },
      });
    }

    case GET_MARKDOWN_PAGE_ERROR: {
      return update(state, {
        isRequesting: { $set: false },
        error: { $set: action.error },
      });
    }

    default:
      return state;
  }
}
