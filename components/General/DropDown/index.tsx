import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useRef, useState } from "react";
import { GluestackUIProvider, Box, Text } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import {
  BLACK_COLOR_CODE,
  LIGHT_GREY_COLOR_CODE,
  WHITE_COLOR_CODE,
} from "../../../constants/Colors";
import { DUMMY_DROPDOWN_DATA } from "../../../constants/DummyData";

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
          data={dropdwnData ? dropdwnData : DUMMY_DROPDOWN_DATA}
          maxHeight={300}
          labelField={labelField ? labelField : "label"}
          valueField={valueField ? valueField : "value"}
          placeholder={placeholder ? placeholder : "Select"}
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
  mainBox: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  dropdown: {
    backgroundColor: WHITE_COLOR_CODE,
    borderRadius: 5,
    padding: 5,
    borderColor: LIGHT_GREY_COLOR_CODE,
    borderWidth: 1,
  },
  placeholderStyle: {
    color: BLACK_COLOR_CODE,
  },
  item: {
    padding: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTextStyle: { fontSize: 20, color: BLACK_COLOR_CODE },
});
