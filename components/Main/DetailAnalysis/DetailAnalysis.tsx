import { StyleSheet } from "react-native";
import {
  GluestackUIProvider,
  Box,
  FlatList,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import React from "react";
import DropDown from "../../../components/General/DropDown";
import Tab from "../../../components/General/Tab/Tab";
import { BLACK_COLOR_CODE } from "../../../constants/Colors";
import { DUMMY_DETAIL_DATA } from "../../../constants/DummyData";

const DetailAnalysis = () => {
 
  return (
    <GluestackUIProvider config={config}>
      <Box style={styles.mainView}>
        <Box>
          <DropDown />
          <FlatList
            style={{ marginBottom: 120 }}
            showsVerticalScrollIndicator={false}
            data={DUMMY_DETAIL_DATA}
            renderItem={({ item, index }) => {
              return <Tab item={item} index={index} />;
            }}
          />
        </Box>
      </Box>
    </GluestackUIProvider>
  );
};

export default DetailAnalysis;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
