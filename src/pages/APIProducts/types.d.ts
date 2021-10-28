import { Filter } from "constants/global";

export type APIFilters = {
  [Filter.text]: string,
  [Filter.prod]: boolean,
  [Filter.sandbox]: boolean,
  [Filter.docs]: boolean,
}
