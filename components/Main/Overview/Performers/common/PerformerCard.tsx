import React from "react";
import { StyleSheet } from "react-native";
import { Divider, HStack, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../../constants/Colors";
import { type TGainerLoser } from "../../../../../interfaces/Main";
import { type IPerformerResult } from "../Performers";

interface IPerformerCardProps {
  selectedTab: TGainerLoser;
  data: IPerformerResult;
}

export default function PerformerCard({
  data,
  selectedTab,
}: IPerformerCardProps) {
  const { percentage_profit_loss, security_description, profit_loss } = data;
  return (
    <VStack style={styles.card}>
      <HStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{security_description}</Text>
      </HStack>
      <Divider my="$0.5" />
      <VStack style={styles.itemContainer} space="md">
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Percentage change</Text>
            <Text style={styles.value}>{percentage_profit_loss}</Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Total PL</Text>
            <Text
              style={styles.value}
              color={selectedTab === "gainer" ? Colors.dark : "#EB5B3C"}
            >
              {profit_loss}
            </Text>
          </VStack>
        </HStack>
      </VStack>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flex: 1,
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  item: {
    flex: 1,
  },
  itemContainer: {
    padding: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 12,
  },
});
