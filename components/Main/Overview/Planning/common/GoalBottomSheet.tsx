import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Badge,
  BadgeText,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

const Goals = [
  {
    id: 1,
    name: "Emergency Fund",
  },
  {
    id: 2,
    name: "Car",
  },
  {
    id: 3,
    name: "Vacation",
  },
  {
    id: 4,
    name: "Home Purchase",
  },
  {
    id: 5,
    name: "Other",
  },
];

interface IGoalBottomSheetProps {
  isOpen: boolean;
  handleModalClose: () => void;
  handleGoalButtonPress: () => void;
}

export default function GoalBottomSheet({
  isOpen,
  handleModalClose,
  handleGoalButtonPress,
}: IGoalBottomSheetProps) {
  const handleBadgePress = (goal: string) => {
    handleModalClose();
    router.push(`/AddGoalModal${buildURLSearchParams({ goal })}`);
  };
  return (
    <Actionsheet isOpen={isOpen} onClose={handleModalClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <VStack space="xl" style={styles.container}>
          <VStack space="md">
            <Text style={styles.title}>Choose your goal</Text>
            <Text style={styles.subtitle}>
              Select from pre-defined goals or create your own
            </Text>
          </VStack>
          <HStack space="md" style={styles.badgeContainer}>
            {Goals.map((goal) => {
              return (
                <TouchableOpacity
                  key={goal.id}
                  onPress={() => {
                    handleBadgePress(goal.name);
                  }}
                >
                  <Badge style={styles.goalBadge}>
                    <BadgeText>{goal.name}</BadgeText>
                  </Badge>
                </TouchableOpacity>
              );
            })}
          </HStack>
          <Text style={styles.title}>OR</Text>
          <Button onPress={handleGoalButtonPress}>
            <ButtonText>Add a new goal</ButtonText>
          </Button>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    margin: 16,
  },
  goalBadge: {
    padding: 8,
  },
  subtitle: {
    color: "gray",
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
