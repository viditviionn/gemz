import React from "react";
import { StyleSheet } from "react-native";
import { HStack, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../../constants/Colors";
import { type IPositionsData } from "../Positions";

interface IPositionCardProps {
  data: IPositionsData;
}

export default function PositionCard({ data }: IPositionCardProps) {
  const { currency_reporting, security_name, isin, market_value_reporting } =
    data;
  return (
    <VStack style={styles.card}>
      <HStack>
        <VStack style={styles.item} justifyConent="space-between">
          <Text size="lg" color={Colors.dark}>
            {isin}
          </Text>
        </VStack>
        <VStack style={styles.item}>
          <Text size="xs" textAlign="right" color={Colors.green}>
            {currency_reporting}
          </Text>
          <Text size="lg" textAlign="right" color={Colors.primary}>
            {market_value_reporting}
          </Text>
        </VStack>
      </HStack>
      <HStack>
        <Text size="lg" color={Colors.dark}>
          {security_name}
        </Text>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    marginHorizontal: 4,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    flex: 1,
  },
});
