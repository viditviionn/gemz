import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Divider,
  FlatList,
  HStack,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Spinner,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

import { useTransactionServerQuery } from "../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../lib/buildURLSearchParams";

import SelectCustodian from "./common/SelectCustodian";

import { PieChart, SearchIcon, Tag } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function TransactionCard({
  isin,
  description,
  asset_class,
  related_trades,
}: Result) {
  return (
    <VStack style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/TransactionDetail${buildURLSearchParams({ isin })}`);
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{description}</Text>
        </View>
        <Divider my="$0.5" />
        <HStack
          style={styles.itemContainer}
          alignItems="center"
          justifyContent="space-between"
        >
          <Badge size="md" style={styles.item}>
            <BadgeIcon as={Tag} mr="$2" />
            <BadgeText>{isin}</BadgeText>
          </Badge>
          <Badge size="md" style={styles.item}>
            <BadgeIcon as={PieChart} mr="$2" />
            <BadgeText>{asset_class}</BadgeText>
          </Badge>
          <Text style={styles.itemText}>{related_trades.length} Trades</Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}

const URLs = {
  get: "/statement/trade/trade_aggregation/",
};

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

interface Result {
  isin: string;
  asset_class: string;
  description: string;
  client_name: string;
  quantity: number;
  related_trades: RelatedTrade[];
}

interface JsonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

function useTransactions(searchQuery: string) {
  const { data, isLoading } = useTransactionServerQuery<JsonResponse>(URLs.get);
  const filteredData = data?.results.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return { filteredData, isLoading };
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");

  const renderItem = ({ item }: { item: Result }) => (
    <TransactionCard {...item} />
  );
  const { filteredData, isLoading } = useTransactions(searchQuery);

  if (isLoading) {
    return <Spinner size="small" />;
  }

  return (
    <VStack>
      <VStack space="md">
        <SelectCustodian />
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

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item: Result) => item.isin}
        />
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
  item: {
    borderStyle: "dashed",
    borderWidth: 1,
    paddingVertical: 6,
  },
  itemContainer: {
    padding: 12,
  },
  itemText: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
