import React from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import GoalCard from "./GoalCard";

const AssetClassMap = {
  equity: "Equity",
  fixed_income: "Fixed Income",
  cash: "Cash",
  alternative: "Alternative",
};

const ReturnExpectationsMap = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

type TAssetClassType = keyof typeof AssetClassMap | undefined;

export interface IGoals {
  id: string;
  name: string;
  asset_class_preference: TAssetClassType[];
  holding_period: string;
  investment_horizon: string;
  liquidity_needs: string;
  return_expectations: keyof typeof ReturnExpectationsMap | undefined;
}

export default function GoalList() {
  const client_id = "637fbb50-d59d-467d-b61d-f99aa897b960";
  const url = `/goals/${buildURLSearchParams({ client_id })}`;
  const { data, isLoading } = useTransactionServerQuery<IGoals[]>(url);
  console.log("Goal Data", data);
  if (isLoading) {
    return <Spinner size="small" />;
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: IGoals }) => <GoalCard data={item} />}
      keyExtractor={(item: IGoals) => item.id}
    />
  );
}
