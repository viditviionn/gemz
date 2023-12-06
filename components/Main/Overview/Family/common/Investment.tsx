import React from "react";
import { StyleSheet } from "react-native";
import { Box, Heading, HStack, Text, View, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../../constants/Colors";
import { convertNumUnit } from "../../../../../constants/utilFuctions";

import { VictoryPie } from "victory-native";

interface investmentType {
  chartData: any;
  totalGainer: number;
}

export default function FamilyInvestment({
  chartData,
  totalGainer,
}: investmentType) {
  const pieColors = Colors.investmentChart;
  const total = chartData?.data?.reduce(
    (acc: number, cur: any) => acc + cur.value,
    0,
  );
  return (
    <View style={styles.card} mt="$7">
      <VStack space="lg">
        <Heading size="xl" bold fontWeight="semibold" color={Colors.dark}>
          Client&apos;s Family Investment
        </Heading>
        <HStack space="4xl" justifyContent="space-between">
          <VStack style={styles.legendWrapper}>
            <Text color={Colors.dark}>Total Networth</Text>
            <Text color={Colors.dark}>SGD {convertNumUnit(total)}</Text>
          </VStack>
          <VStack style={styles.chartWrapper}>
            <Text color={Colors.dark}>Total Gains</Text>
            <Text color={Colors.dark}>SGD {convertNumUnit(totalGainer)}</Text>
          </VStack>
        </HStack>
        <HStack space="4xl" justifyContent="space-between" alignItems="center">
          <VStack style={styles.legendWrapper}>
            {chartData?.data?.map((pie: any, index: number) => (
              <Box mt="$3" key={index}>
                <HStack alignItems="center" space="sm">
                  <Box
                    bg={Colors.investmentChart[index]}
                    sx={{ w: 12, h: 12 }}
                  ></Box>
                  <Text color={Colors.dark}>{pie.type}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
          <VStack style={styles.chartWrapper}>
            <VStack style={styles.chart} mt="$5">
              <VictoryPie
                data={chartData?.data?.map((pie: any) => ({
                  x: pie.type,
                  y: (pie.value / total) * 100,
                }))}
                colorScale={pieColors}
                innerRadius={45}
                radius={75}
                style={{ labels: { display: "none" } }}
              />
              <Text color={Colors.dark} style={styles.chartLabel}>
                {convertNumUnit(total)}
              </Text>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Adjust opacity to make the shadow lighter
    shadowRadius: 4,
  },
  chart: {
    alignItems: "center",
    height: 150,
    justifyContent: "center",
    width: 150,
  },
  chartLabel: {
    fontSize: 12,
    position: "absolute",
  },
  chartWrapper: {
    flex: 1,
    // maxWidth: '50%'
  },
  legendWrapper: {
    flex: 1,
    // maxWidth: '50%'
  },
});
