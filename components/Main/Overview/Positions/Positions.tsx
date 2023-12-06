import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  Spinner,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import Colors from "../../../../constants/Colors";
import { AuthContext } from "../../../../context/AuthProvider";
import { useTransactionServerQuery } from "../../../../hooks/useQuery";
import useReportDateRange from "../../../../hooks/useReportDateRange";
import buildURLSearchParams from "../../../../lib/buildURLSearchParams";
import { formatCompactNumber } from "../../../../lib/format";
import SelectCustodian from "../Transactions/common/SelectCustodian";

import PositionList from "./common/PositionList";
import SelectAssetClass from "./common/SelectAssetClass";

export interface IPositionNetWorth {
  client_id: string;
  client_name: string;
  assets: number;
  liabilities: number;
  networth: number;
  currency: string;
}

export interface IPositionSearchResponse {
  client_cards: IPositionNetWorth[];
}

export interface IPositionsData {
  id: string;
  security_name: string;
  isin: string;
  market_value_reporting: string;
  currency_reporting: string;
}

export interface IPositionsResponse {
  count: number;
  next: string;
  previous: string;
  results: IPositionsData[] | undefined;
}

export default function Positions() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const [searchQuery, setSearchQuery] = useState("");
  const { endDate } = useReportDateRange();

  const { data: netWorthData } =
    useTransactionServerQuery<IPositionSearchResponse>(
      `/statement/position/networth_cards/`,
    );

  const networth = netWorthData?.client_cards[0]?.networth ?? 0;

  const { data, isLoading } = useTransactionServerQuery<IPositionsResponse>(
    `/position/history/position_aggregation/${buildURLSearchParams({
      client: client_id,
      statement_date: endDate,
    })}`,
  );

  const filteredData = data?.results?.filter((item: IPositionsData) =>
    item.security_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView>
      <VStack space="md">
        <Heading>Positions</Heading>
        <SelectCustodian />
        <SelectAssetClass />
        <Input>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(value: string) => {
              setSearchQuery(value);
            }}
          />
        </Input>
        <Text size="3xl" color={Colors.dark}>
          {netWorthData?.client_cards[0]?.currency}{" "}
          {formatCompactNumber(networth)}
        </Text>
        <PositionList data={filteredData} />
      </VStack>
    </SafeAreaView>
  );
}
