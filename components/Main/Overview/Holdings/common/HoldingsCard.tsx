import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Divider, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../../constants/Colors";
import { useTransactionServerDeleteMutation } from "../../../../../hooks/useMutation";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";
import revalidate from "../../../../../lib/revalidate";

import { type IHoldings } from "./HoldingsList";

import { Edit, Trash } from "lucide-react-native";

interface IHoldingsProps {
  data: IHoldings;
}

const URLs = {
  delete: "/bank_account/{id}/",
};

function useHoldingsDelete(id: string) {
  const { trigger } = useTransactionServerDeleteMutation(
    URLs.delete.replace("{id}", id),
    {
      onSuccess(data) {
        console.log("Bank account deleted successfully", data);
        revalidate("/bank_account/");
      },
      onError(error, key, config) {
        console.log("Error deleting account", error, key, config);
      },
    },
  );
  return { trigger };
}

export default function HoldingsCard({ data }: IHoldingsProps) {
  const {
    custodian_name,
    account_number,
    account_type,
    relationship_number,
    currency,
  } = data;
  const { trigger: deleteAccount } = useHoldingsDelete(relationship_number);
  const handleEdit = (id: string) => {
    router.push(`/AddHoldingsAccountModal${buildURLSearchParams({ id })}`);
  };
  const onDeletePress = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteAccount();
          },
        },
      ],
    );
  };
  return (
    <VStack style={styles.card}>
      <HStack style={styles.headerContainer}>
        <Text style={styles.headerText} color={Colors.dark}>
          {custodian_name}
        </Text>
        <HStack style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              handleEdit(relationship_number);
            }}
          >
            <Icon as={Edit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Icon as={Trash} color="#F3203A" />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <Divider my="$0.5" />
      <VStack style={styles.itemContainer} space="md">
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label} color={Colors.dark}>
              Account Number
            </Text>
            <Text style={styles.value} color={Colors.dark}>
              {account_number}
            </Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label} color={Colors.dark}>
              Account Type
            </Text>
            <Text style={styles.value} color={Colors.dark}>
              {account_type}
            </Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label} color={Colors.dark}>
              Relationship Number
            </Text>
            <Text style={styles.value} color={Colors.dark}>
              {relationship_number}
            </Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label} color={Colors.dark}>
              Currency
            </Text>
            <Text style={styles.value} color={Colors.dark}>
              {currency}
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
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 16,
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
