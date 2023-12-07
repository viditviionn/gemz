import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../constants/Colors";
import { useTransactionServerQuery } from "../../../../hooks/useQuery";
import { formatCompactNumber } from "../../../../lib/format";
import { type IPositionSearchResponse } from "../Positions/Positions";

export default function NetWorthCard() {
  const { data: netWorthData } =
    useTransactionServerQuery<IPositionSearchResponse>(
      `/statement/position/networth_cards/`
    );

  return (
    <Link href={"/insights/investment"} asChild>
      <TouchableOpacity style={styles.card}>
        <VStack space="lg">
          <Heading
            size="lg"
            fontWeight="semibold"
            color={Colors.dark}
            textAlign="center"
          >
            {netWorthData?.client_cards[0]?.client_name}&apos;S family
            investment
          </Heading>
          <HStack justifyContent="space-between">
            <VStack>
              <Text color={Colors.dark}>Networth</Text>
              <Text>
                {formatCompactNumber(netWorthData?.client_cards[0]?.networth)}
              </Text>
            </VStack>
            <VStack>
              <Text color={Colors.dark}>Assets</Text>
              <Text>
                {formatCompactNumber(netWorthData?.client_cards[0]?.assets)}
              </Text>
            </VStack>
            <VStack>
              <Text color={Colors.dark}>Liabilites</Text>
              <Text>
                {formatCompactNumber(
                  netWorthData?.client_cards[0]?.liabilities
                )}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </Link>
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
});
