import React from "react";
import { StyleSheet } from "react-native";
import {
  Badge,
  BadgeText,
  FlatList,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
interface RelatedTrade {
  id: string;
  custodian_name: string;
  client_name: string;
  created_at: string;
  modified_at: string;
  statement_date: string;
  meta: Record<string, any>;
  reference_number: string;
  isin: string;
  asset_class: string;
  trade_date: string;
  settlement_date: string;
  trade_action: string | null;
  description: string;
  currency: string;
  cost_price: number;
  quantity: number;
  debit: number;
  credit: number;
  settlement_amount: number;
  client: string;
  custodian: string;
  relationship_number: string;
}

function TransactionCard(transaction: RelatedTrade) {
  return (
    <VStack space="md" style={styles.card}>
      <HStack space="md" justifyContent="flex-end" alignItems="center">
        <Badge>
          <BadgeText>{transaction.relationship_number}</BadgeText>
        </Badge>
        <Badge action="success">
          <BadgeText>{transaction.trade_action}</BadgeText>
        </Badge>
        <Badge variant="outline" action="muted">
          <BadgeText>{transaction.currency}</BadgeText>
        </Badge>
      </HStack>
      <Text style={styles.title}>{transaction.isin}</Text>
      <VStack space="md">
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Reference Number</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.reference_number}
            </Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Transaction Date</Text>
            <Text style={styles.itemSubtitle}>{transaction.trade_date}</Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Quantity</Text>
            <Text style={styles.itemSubtitle}>{transaction.quantity}</Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Average Price</Text>
            <Text style={styles.itemSubtitle}>{transaction.cost_price}</Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Debit</Text>
            <Text style={styles.itemSubtitle}>{transaction.debit}</Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Credit</Text>
            <Text style={styles.itemSubtitle}>{transaction.credit}</Text>
          </VStack>
        </HStack>
        <HStack style={styles.parentItemContainer}>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Settlement Date</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.settlement_date}
            </Text>
          </VStack>
          <VStack style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Settlement Amount</Text>
            <Text style={styles.itemSubtitle}>
              {transaction.settlement_amount}
            </Text>
          </VStack>
        </HStack>
        <VStack>
          <Text style={styles.itemTitle}>Description</Text>
          <Text style={styles.itemSubtitle}>{transaction.description}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default function TransactionList({
  transactions,
}: {
  transactions?: RelatedTrade[];
}) {
  return (
    <FlatList
      data={transactions}
      renderItem={({ item }: { item: RelatedTrade }) => {
        return <TransactionCard {...item} />;
      }}
      keyExtractor={(item: RelatedTrade) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  itemSubtitle: {
    fontSize: 12,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  parentItemContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
