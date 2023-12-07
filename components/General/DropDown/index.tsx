import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text } from "@gluestack-ui/themed";

import {
  BLACK_COLOR_CODE,
  LIGHT_GREY_COLOR_CODE,
  WHITE_COLOR_CODE,
} from "../../../constants/Colors";
import { DUMMY_DROPDOWN_DATA } from "../../../constants/DummyData";

import { Dropdown } from "react-native-element-dropdown";

const DropDown = (props: any) => {
  const {
    dropdwnData,
    labelField,
    valueField,
    onChange = () => {},
    placeholder,
  } = props;
  const ref: any = useRef();
  const [status] = useState();

  const renderItem = (item: any) => {
    return (
      <Box style={styles.item}>
        <Text>{labelField ? item[labelField] : item?.label}</Text>
      </Box>
    );
  };
  return (
    <GluestackUIProvider config={config}>
      <Box style={styles.mainBox}>
        <Dropdown
          ref={ref}
          style={[
            styles.dropdown,
            {
              width: "100%",
              height: 50,
              paddingLeft: 10,
            },
          ]}
          itemTextStyle={styles.itemTextStyle}
          placeholderStyle={styles.placeholderStyle}
          data={dropdwnData || DUMMY_DROPDOWN_DATA}
          maxHeight={300}
          labelField={labelField || "label"}
          valueField={valueField || "value"}
          placeholder={placeholder || "Select"}
          value={status}
          onChange={(item) => {
            onChange(item);
          }}
          renderItem={renderItem}
        />
      </Box>
    </GluestackUIProvider>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: WHITE_COLOR_CODE,
    borderColor: LIGHT_GREY_COLOR_CODE,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 11,
  },
  itemTextStyle: { color: BLACK_COLOR_CODE, fontSize: 20 },
  mainBox: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  placeholderStyle: {
    color: BLACK_COLOR_CODE,
  },
});
