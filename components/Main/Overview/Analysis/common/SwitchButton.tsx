import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

interface ISwitchButtonProps {
  selectedTab: number;
  setSelectedTab: (_selectedTab: number) => void;
}
export default function SwitchButton({
  selectedTab,
  setSelectedTab,
}: ISwitchButtonProps) {
  return (
    <View style={styles.switchButtonContainer}>
      <TouchableOpacity
        style={[
          styles.switchButton,
          selectedTab === 0 && styles.selectedSwitchButton,
        ]}
        onPress={() => {
          setSelectedTab(0);
        }}
      >
        <Text
          style={[
            styles.switchButtonText,
            selectedTab === 0 && styles.selectedSwitchButtonText,
          ]}
        >
          Gross Allocation
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.switchButton,
          selectedTab === 1 && styles.selectedSwitchButton,
        ]}
        onPress={() => {
          setSelectedTab(1);
        }}
      >
        <Text
          style={[
            styles.switchButtonText,
            selectedTab === 1 && styles.selectedSwitchButtonText,
          ]}
        >
          Relative Performance
        </Text>
      </TouchableOpacity>
    </View>
  );
}
