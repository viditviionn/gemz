import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  Badge,
  BadgeText,
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { useTransactionServerDeleteMutation } from "../../../../../hooks/useMutation";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";
import revalidate from "../../../../../lib/revalidate";

import { type TGoalsType } from "./PlanningList";

import { Edit, Trash } from "lucide-react-native";

interface IGoalCardProps {
  data: TGoalsType;
}

const URLs = {
  delete: "/goals/{id}/",
};

function useGoalDelete(id: string) {
  const { trigger } = useTransactionServerDeleteMutation(
    URLs.delete.replace("{id}", id),
    {
      onSuccess(data) {
        console.log("Goal deleted successfully", data);
        revalidate("/goals/");
      },
      onError(error, key, config) {
        console.log("Error deleting goal", error, key, config);
      },
    },
  );
  return { trigger };
}

export default function GoalCard({ data }: IGoalCardProps) {
  const {
    id,
    asset_class_preference,
    name,
    investment_horizon,
    return_expectations,
  } = data;

  const { trigger: deleteGoal } = useGoalDelete(id);

  const onEditPress = (id: string) => {
    router.push(`/AddGoalModal${buildURLSearchParams({ id })}`);
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
          deleteGoal();
        },
      },
    ]);
  };

  return (
    <VStack style={styles.goalCard}>
      <HStack style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
        <HStack style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              onEditPress(id);
            }}
          >
            <Icon as={Edit} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onDeletePress();
            }}
          >
            <Icon as={Trash} />
          </TouchableOpacity>
        </HStack>
      </HStack>
      <Divider my="$0.5" />
      <VStack space="sm" style={styles.assetClassContainer}>
        <Text style={styles.label}>Asset Class</Text>
        <HStack space="md">
          {asset_class_preference?.map((assetClass) => {
            return (
              <Badge key={assetClass}>
                <BadgeText style={styles.value}>{assetClass}</BadgeText>
              </Badge>
            );
          })}
        </HStack>
      </VStack>
      <Divider my="$0.5" />
      <VStack style={styles.container}>
        <Text style={styles.label}>Investment Horizon</Text>
        <Text style={styles.value}>{investment_horizon}</Text>
      </VStack>
      <Divider my="$0.5" />
      <VStack style={styles.container}>
        <Text style={styles.label}>Return Expectations</Text>
        <Text style={styles.value}>{return_expectations}</Text>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  assetClassContainer: {
    padding: 12,
  },
  container: {
    padding: 12,
  },
  goalCard: {
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
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
});
