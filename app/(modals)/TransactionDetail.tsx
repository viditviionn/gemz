import React from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Spinner, VStack } from "@gluestack-ui/themed";

import TransactionList from "../../components/Main/Overview/Transactions/common/TransactionList";
import { useTransactionServerQuery } from "../../hooks/useQuery";
import buildURLSearchParams from "../../lib/buildURLSearchParams";

const URLs = {
  get: "/statement/trade/trade_aggregation/",
};

interface RelatedTrade {
  id: string;
  custodian_name: string;
  client_name: string;
  created_at: string;
  modified_at: string;
  statement_date: string;
  meta: Record<string, any>;
  reference_number: string;
  isin: string;
  asset_class: string;
  trade_date: string;
  settlement_date: string;
  trade_action: string | null;
  description: string;
  currency: string;
  cost_price: number;
  quantity: number;
  debit: number;
  credit: number;
  settlement_amount: number;
  client: string;
  custodian: string;
  relationship_number: string;
}

interface Result {
  isin: string;
  asset_class: string;
  description: string;
  client_name: string;
  quantity: number;
  related_trades: RelatedTrade[];
}

interface JsonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

function useTransactionDetail(isin: string) {
  const url = `${URLs.get}${buildURLSearchParams({ isin })}`;
  const { data, isLoading } = useTransactionServerQuery<JsonResponse>(url);
  return { data, isLoading };
}

export default function TransactionDetail() {
  const { isin } = useLocalSearchParams<{ isin: string }>();
  const { data, isLoading } = useTransactionDetail(isin);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <VStack style={styles.container}>
      <TransactionList transactions={data?.results[0].related_trades} />
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
