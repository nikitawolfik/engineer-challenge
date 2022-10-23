import { useMemo } from "react";
import useSWR from "swr";
import { Policy } from "types";
export default function usePolicies(query: string) {
  const { data, error, ...rest } = useSWR<Policy[]>(`policies?search=${query}`);

  // normally I would've used `policy => ['ACTIVE', 'PENDING'].includes(policy.status)
  // but I've wanted to use typed autocomplete without explicitly typecasting array type
  const filtered = useMemo(
    () =>
      data
        ? data.filter(
            (policy) =>
              policy.status === "ACTIVE" || policy.status === "PENDING"
          )
        : [],
    [data]
  );

  return {
    policies: filtered,
    error,
    isFetching: !data && !error,
    ...rest,
  };
}
