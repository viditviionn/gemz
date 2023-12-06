import React, { useContext } from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
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
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const url = `/goals/${buildURLSearchParams({ client_id })}`;
  const { data, isLoading } = useTransactionServerQuery<IGoals[]>(url);
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
