import update from "immutability-helper";

import { MediaActions } from "./actions/types";
import { DELETE_MEDIA, DELETE_MEDIA_ERROR, DELETE_MEDIA_SUCCESS } from "./actions/deleteMedia";
import { UPLOAD_MEDIA, UPLOAD_MEDIA_ERROR, UPLOAD_MEDIA_RESET, UPLOAD_MEDIA_SUCCESS } from "./actions/uploadMedia";
import { FileData, MediaStore } from "./types";

const initialState: MediaStore = {
  media: {
    savedObjects: [],
    errors: [],
  },
  isRequesting: false,
};

export default function reducer (
  state = initialState,
  action: MediaActions,
): MediaStore {
  switch (action.type) {
    case UPLOAD_MEDIA:
    case DELETE_MEDIA: {
      return update(state, {
        isRequesting: { $set: true },
      });
    }

    case DELETE_MEDIA_SUCCESS: {
      return update(state, {
        media: {
          savedObjects: { $set: state.media.savedObjects.filter((obj: FileData) => obj.url !== action.url) },
        },
        isRequesting: { $set: false },
      });
    }

    case UPLOAD_MEDIA_SUCCESS: {
      return update(state, {
        media: { $set: action.media },
        isRequesting: { $set: false },
      });
    }

    case UPLOAD_MEDIA_ERROR:
    case DELETE_MEDIA_ERROR: {
      return update(state, {
        isRequesting: { $set: false },
      });
    }

    case UPLOAD_MEDIA_RESET: {
      return update(state, {
        media: {
          savedObjects: { $set: [] },
        },
        isRequesting: { $set: false },
      });
    }

    default:
      return state;
  }
}
