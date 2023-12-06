import React from "react";
import { Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Divider, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";

import { useTransactionServerDeleteMutation } from "../../../../../hooks/useMutation";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";
import revalidate from "../../../../../lib/revalidate";

import { type IEstate } from "./EstateList";

import { Edit, Trash } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const BenificiaryMap = {
  nominee: "Nominee",
  beneficiary_person: "Beneficiary Person",
  beneficiary_trust: "Beneficiary Trust",
};

interface IEstateCardProps {
  data: IEstate;
}
const URLs = {
  delete: "/estate/{id}/",
};

function useEstateDelete(id: string) {
  const { trigger } = useTransactionServerDeleteMutation(
    URLs.delete.replace("{id}", id),
    {
      onSuccess(data) {
        console.log("Goal deleted successfully", data);
        revalidate("/estate/");
      },
      onError(error, key, config) {
        console.log("Error deleting goal", error, key, config);
      },
    },
  );
  return { trigger };
}

export default function EstateCard({ data }: IEstateCardProps) {
  const {
    id,
    name,
    relationship,
    email,
    date_of_birth,
    phone,
    percent_share,
    type,
  } = data;
  const { trigger: deleteEstate } = useEstateDelete(id);
  const handleEdit = (id: string) => {
    router.push(`/AddEstateModal${buildURLSearchParams({ id })}`);
  };
  const onDeletePress = () => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteEstate();
        },
      },
    ]);
  };
  return (
    <VStack style={styles.card}>
      <HStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{BenificiaryMap[type]}</Text>
        <HStack style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              handleEdit(id);
            }}
          >
            <Icon as={Edit} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress}>
            <Icon as={Trash} />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <Divider my="$0.5" />
      <VStack style={styles.itemContainer} space="md">
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{name}</Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Relationship</Text>
            <Text style={styles.value}>{relationship}</Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>DOB</Text>
            <Text style={styles.value}>{date_of_birth}</Text>
          </VStack>
        </HStack>
        <HStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{phone}</Text>
          </VStack>
          <VStack style={styles.item}>
            <Text style={styles.label}>Share Percentage</Text>
            <Text style={styles.value}>{percent_share}%</Text>
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
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
});
