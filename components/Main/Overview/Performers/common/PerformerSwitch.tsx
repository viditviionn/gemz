import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { type TGainerLoser } from "../../../../../interfaces/Main";

interface IPerformerSwitchProps {
  selectedTab: TGainerLoser;
  setSelectedTab: (_selectedTab: TGainerLoser) => void;
}
export default function SwitchButton({
  selectedTab,
  setSelectedTab,
}: IPerformerSwitchProps) {
  return (
    <View style={styles.switchButtonContainer}>
      <TouchableOpacity
        style={[
          styles.switchButton,
          selectedTab === "gainer" && styles.selectedSwitchButton,
        ]}
        onPress={() => {
          setSelectedTab("gainer");
        }}
      >
        <Text
          style={[
            styles.switchButtonText,
            selectedTab === "gainer" && styles.selectedSwitchButtonText,
          ]}
        >
          Gainers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.switchButton,
          selectedTab === "loser" && styles.selectedSwitchButton,
        ]}
        onPress={() => {
          setSelectedTab("loser");
        }}
      >
        <Text
          style={[
            styles.switchButtonText,
            selectedTab === "loser" && styles.selectedSwitchButtonText,
          ]}
        >
          Losers
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedSwitchButton: {
    backgroundColor: "#1890FF",
  },
  selectedSwitchButtonText: {
    color: "#fff",
  },
  switchButton: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  switchButtonContainer: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 45,
    padding: 4,
  },
  switchButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
