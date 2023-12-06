import React, { useContext } from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import HoldingsCard from "./HoldingsCard";

export interface IHoldings {
  id: string;
  custodian: string;
  custodian_name: string;
  account_number: string;
  account_type: string;
  relationship_number: string;
  currency: string;
}

export default function HoldingsList() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const url = `/bank_account/${buildURLSearchParams({ client_id })}`;

  const { data, isLoading } = useTransactionServerQuery<IHoldings[]>(url);

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: IHoldings }) => (
        <HoldingsCard data={item} />
      )}
      keyExtractor={(item: IHoldings) => item.id}
    />
  );
}
