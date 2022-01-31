import { Api } from "store/subscriptions/types";

export const getLatestAPIProduct = (apis: Api[]): number => {
  const datesInMilliseconds: number[] = apis.map((api) => {
    return api.updatedAt ? new Date(api.updatedAt).getTime() : -1;
  });

  /* If we happen to have two API Products with the same date-in-milliseconds,
  we return the index of the first one, as there's no other "tiebreaker". */
  return datesInMilliseconds.indexOf(Math.max(...datesInMilliseconds));
};
