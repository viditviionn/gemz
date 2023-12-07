import React from "react";
import { StyleSheet } from "react-native";
import { config } from "@gluestack-ui/config";
import {
  Box,
  FlatList,
  GluestackUIProvider,
} from "@gluestack-ui/themed";

import DropDown from "../../../components/General/DropDown";
import Tab from "../../../components/General/Tab/Tab";
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
