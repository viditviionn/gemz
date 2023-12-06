import { useContext } from "react";

import { AnalyticsServerUrl, TransactionServerUrl } from "../constants/strings";
import { AuthContext } from "../context/AuthProvider";
import { getFetcher, postJsonFetcher } from "../lib/fetcher";

import useSWR, { type SWRConfiguration } from "swr";

type TKey = string | [string, Record<string, string>] | null;

function formatKey(key: TKey, access_token: string) {
  if (key) {
    if (Array.isArray(key)) {
      return [...key, access_token];
    }
    return [key, access_token];
  }
  return null;
}

function useQuery<Data>(
  key: TKey,
  fetcher: (
    _key: string,
    _options?: { arg: Record<string, string> },
  ) => Promise<Data>,
  config?: SWRConfiguration<Data, Error>,
) {
  const { authState } = useContext(AuthContext);
  const access_token = authState.accessToken;
  return useSWR<Data, Error>(formatKey(key, access_token), fetcher, {
    keepPreviousData: true,
    ...config,
  });
}

export function useTransactionServerQuery<Data>(
  key: string | null,
  config?: SWRConfiguration<Data, Error>,
) {
  return useQuery<Data>(key, getFetcher(TransactionServerUrl), config);
}
type SearchParams = "start_date" | "end_date" | "client_id";
export function useAnalyticsServerQuery<Data>(
  key: string | null,
  args: Partial<Record<SearchParams, string>>,
  config?: SWRConfiguration<Data, Error>,
) {
  return useQuery<Data>(
    key ? [key, args] : null,
    postJsonFetcher(AnalyticsServerUrl),
    config,
  );
}
