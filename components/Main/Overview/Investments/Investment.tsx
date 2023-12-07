import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { HStack, Text, View, VStack } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../context/AuthProvider";
import useBalanceSheet from "../../../../hooks/useBalanceSheet";
import { useAnalyticsServerGetQuery } from "../../../../hooks/useQuery";
import useReportDateRange from "../../../../hooks/useReportDateRange";
import buildURLSearchParams from "../../../../lib/buildURLSearchParams";
import { formatCompactNumber, formatPercentage } from "../../../../lib/format";
import SelectCustodian from "../Transactions/common/SelectCustodian";

import ChartTable from "./common/ChartTable";

export interface IBalanceSheetChart {
  key: string;
  asset_class: string;
  total_value: number;
  percentage: number;
}

export interface IBalanceSheetOverview {
  asset: IBalanceSheetChart[];
  liability: IBalanceSheetChart[];
  reporting_currency: string;
}

export default function Investment() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const { endDate } = useReportDateRange();

  const { data, isLoading } = useAnalyticsServerGetQuery<IBalanceSheetOverview>(
    `/networth/${client_id}/${buildURLSearchParams({
      report_date: endDate,
    })}`
  );
  const {
    totalAsset,
    totalLiability,
    leverage,
    netWorth,
    assetPercentage,
    liabilityPercentage,
  } = useBalanceSheet({ data });
  return (
    <VStack space="md">
      <SelectCustodian />
      <VStack space="lg" style={styles.card}>
        <Text>Overview</Text>
        <ChartTable
          data={data?.asset}
          loading={isLoading}
          progressType="success"
          total={totalAsset}
          percentage={assetPercentage}
        />
        <ChartTable
          data={data?.liability}
          loading={isLoading}
          progressType="failure"
          total={totalLiability}
          percentage={liabilityPercentage}
        />
      </VStack>
      <HStack>
        <View style={styles.card}>
          <Text>{formatCompactNumber(netWorth)}</Text>
          <Text>Net Worth</Text>
        </View>
        <View style={styles.card}>
          <Text>{formatPercentage(leverage)}</Text>
          <Text>Leverage</Text>
        </View>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 4,
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
