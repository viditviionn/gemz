import React from "react";
import {
  type ColorValue,
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Close } from "../../../../../assets/svgs";

interface IListItemProps {
  color?: ColorValue | undefined;
  title: string;
  onCloseIconPress?: PressableProps["onPress"];
}

const ListItem = ({ color, title, onCloseIconPress }: IListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.colorBox, { backgroundColor: color }]} />
      <Text style={styles.itemTitle}>{title}</Text>
      <Pressable hitSlop={10} onPress={onCloseIconPress}>
        <Close />
      </Pressable>
    </View>
  );
};

export default ListItem;
const styles = StyleSheet.create({
  colorBox: {
    height: 12,
    width: 12,
  },
  container: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FAFAFA",
    borderColor: "#DAD8D8",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    margin: 4,
    paddingHorizontal: 10,
  },
  itemTitle: {
    color: "#000000D9",
    fontSize: 14,
    lineHeight: 22,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
