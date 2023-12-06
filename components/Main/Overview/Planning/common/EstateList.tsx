import React, { useContext } from "react";
import { FlatList, Spinner } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import EstateCard from "./EstateCard";
const BenificiaryMap = {
  nominee: "Nominee",
  beneficiary_person: "Beneficiary Person",
  beneficiary_trust: "Beneficiary Trust",
};

type TBeneficaryType = keyof typeof BenificiaryMap;

export interface IEstate {
  id: string;
  type: TBeneficaryType;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  relationship: string;
  percent_share: string;
}

export default function EstateList() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const url = `/estate/${buildURLSearchParams({ client_id })}`;
  const { data, isLoading } = useTransactionServerQuery<IEstate[]>(url);

  if (isLoading) {
    return <Spinner size="small" />;
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: IEstate }) => <EstateCard data={item} />}
      keyExtractor={(item: IEstate) => item.id}
    />
  );
}
