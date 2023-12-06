import React from "react";
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";

import Colors from "../../../../../constants/Colors";

interface IToggleButtonProps {
  onPress: PressableProps["onPress"];
  label: string;
  isSelected: boolean;
}

const ToggleButton = ({ onPress, label, isSelected }: IToggleButtonProps) => {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text style={[styles.labelText, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    borderRadius: 6,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  labelText: {
    color: Colors.characterTitle85,
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 4,
  },
  selectedContainer: {
    backgroundColor: Colors.Primary6,
  },
  selectedText: {
    color: Colors.characterPrimaryInverse,
  },
});
