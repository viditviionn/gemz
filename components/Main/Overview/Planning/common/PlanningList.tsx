import React, { useContext } from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import EstateCard from "./EstateCard";
import GoalCard from "./GoalCard";

interface IPlanningListProps {
  selectedTab: number;
}

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

export interface TGoalsType {
  id: string;
  name: string;
  asset_class_preference?: TAssetClassType[];
  holding_period: string;
  investment_horizon: string;
  liquidity_needs: string;
  return_expectations?: keyof typeof ReturnExpectationsMap;
}

const BenificiaryMap = {
  nominee: "Nominee",
  beneficiary_person: "Beneficiary Person",
  beneficiary_trust: "Beneficiary Trust",
};

type TBeneficaryType = keyof typeof BenificiaryMap;

export interface TEstate {
  id: string;
  type: TBeneficaryType;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  relationship: string;
  percent_share: string;
}

export default function PlanningList({ selectedTab }: IPlanningListProps) {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  if (selectedTab === 0) {
    const url = `/goals/${buildURLSearchParams({ client_id })}`;
    const { data, isLoading } = useTransactionServerQuery<TGoalsType[]>(url);
    if (isLoading) {
      return <Spinner size="small" />;
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }: { item: TGoalsType }) => (
          <GoalCard data={item} />
        )}
        keyExtractor={(item: TGoalsType) => item.id}
      />
    );
  }
  const url = `/estate/${buildURLSearchParams({ client_id })}`;
  const { data, isLoading } = useTransactionServerQuery<TEstate[]>(url);

  if (isLoading) {
    return <Spinner size="small" />;
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: TEstate }) => <EstateCard data={item} />}
      keyExtractor={(item: TEstate) => item.id}
    />
  );
}
