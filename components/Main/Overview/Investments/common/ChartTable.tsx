import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Spinner, Text, View } from "@gluestack-ui/themed";

import {
  formatCompactNumber,
  formatPercentage,
} from "../../../../../lib/format";
import { type IBalanceSheetChart } from "../Investment";

interface ChartTableProps {
  loading: boolean;
  data?: IBalanceSheetChart[];
  progressType: string;
  total: number;
  percentage: number;
}

export default function ChartTable({
  data,
  loading,
  progressType,
  total,
  percentage,
}: ChartTableProps) {
  const TotalText =
    progressType === "success" ? "Total Assets" : "Total Liabilities";
  if (loading) {
    return <Spinner />;
  }
  return (
    <ScrollView>
      <View style={styles.row}>
        <Text style={styles.cellHeader} size="sm">
          Asset Class
        </Text>
        <Text style={styles.cellHeader} size="sm">
          Total Value
        </Text>
        <Text style={styles.cellHeader} size="sm">
          in %
        </Text>
      </View>
      {data?.map((rowData, index) => (
        <View style={styles.row} key={index}>
          <View
            style={[
              styles.bgRow,
              {
                backgroundColor:
                  progressType === "success" ? "#D9F7BE" : "#FFCCC7",
                width: `${Math.round(rowData.percentage)}%`,
              },
            ]}
          >
            <View style={styles.cell}>
              <Text size="xs">{rowData.asset_class}</Text>
            </View>

            <View style={styles.cell}>
              <Text size="xs">{formatCompactNumber(rowData.total_value)}</Text>
            </View>

            <View style={styles.cell}>
              <Text size="xs">{formatPercentage(rowData.percentage)}</Text>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.cellHeader} size="sm">
          {TotalText}
        </Text>
        <Text style={styles.cellHeader} size="sm">
          {formatCompactNumber(total)}
        </Text>
        <Text style={styles.cellHeader} size="sm">
          {formatPercentage(percentage)}%
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgRow: {
    backgroundColor: "#D9F7BE",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    textAlign: "left",
  },
  cellHeader: {
    flex: 1,
    textAlign: "left",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: "relative",
    zIndex: 10,
  },
});
