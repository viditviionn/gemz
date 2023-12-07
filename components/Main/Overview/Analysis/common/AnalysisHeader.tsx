import React from "react";
import { HStack, Text } from "@gluestack-ui/themed";
import styles from "./styles";

interface IPlanningHeader {
  selectedTab: number;
}

const headerMapping: Record<number, Record<string, string>> = {
  0: {
    title: "Gross Allocation",
    buttonText: "Add Goal",
  },
  1: {
    title: "Relative Performance",
    buttonText: "Add Estate",
  },
};

export default function PlanningHeader({ selectedTab }: IPlanningHeader) {
  return (
    <HStack style={styles.headerContainer}>
      <Text style={styles.title}>
        Hi Krish Parekh {"\n"}This is your overall Portfolio Analysis
      </Text>
    </HStack>
  );
}
