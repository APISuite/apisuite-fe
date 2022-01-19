
import { History } from "history";

export type LocationHistory = History & {
  location: {
    state: {
      redirected?: boolean,
      appID?: string,
    },
  },
}