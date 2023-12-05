import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Button, Text, VStack } from "@gluestack-ui/themed";

import HoldingsList from "./common/HoldingsList";

export default function Holdings() {
  const handleButtonPress = () => {
    router.push("/(modals)/AddHoldingsAccountModal");
  };
  return (
    <VStack space="md">
      <Button size="xs" onPress={handleButtonPress} style={styles.headerButton}>
        <Text style={styles.headerButtonText}>Add Holdings Account</Text>
      </Button>
      <SafeAreaView>
        <HoldingsList />
      </SafeAreaView>
    </VStack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    alignSelf: "flex-end",
    backgroundColor: "#1890FF",
  },
  headerButtonText: {
    color: "white",
    fontSize: 14,
  },
});
