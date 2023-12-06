import React from "react";
import { type ColorValue, StyleSheet, Text, View } from "react-native";

import Colors from "../../../../../constants/Colors";

interface IDropDownListItemProps {
  color?: ColorValue;
  title: string;
}

const DropDownListItem = ({ title, color }: IDropDownListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.colorBx, { backgroundColor: color }]} />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default DropDownListItem;

const styles = StyleSheet.create({
  colorBx: {
    aspectRatio: 1,
    height: 14,
    marginHorizontal: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  titleText: {
    color: Colors.characterTitle85,
    fontSize: 14,
    lineHeight: 22,
    marginVertical: 5,
  },
});
