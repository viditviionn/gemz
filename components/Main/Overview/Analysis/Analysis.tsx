import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../../../../constants/Colors";

import AnalysisView from "./common/AnalysisView";
import RelativePerformance from "./common/RelativePerformance";
export default function Analysis() {
  const [selectedTab, setSelectedTab] = useState(0);
  const AnalysisType = ["Gross Allocations", "Relative Performance"];
  const isRelativePerformance = selectedTab === 1;
  return (
    <>
      <View style={styles.container}>
        {AnalysisType.map((title, index) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedTab(index);
              }}
              key={title}
              style={[
                styles.btnContainer,
                index === 0 ? styles.firstBtnContainer : {},
                {
                  backgroundColor:
                    selectedTab === index ? Colors.primary : Colors.Neutral1,
                },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    color:
                      selectedTab === index ? Colors.Neutral1 : Colors.primary,
                  },
                ]}
              >
                {title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {!isRelativePerformance ? (
        <AnalysisView selectedTab={selectedTab} />
      ) : (
        <RelativePerformance />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  btnContainer: { flex: 1 },
  container: {
    alignItems: "center",
    backgroundColor: Colors.Neutral1,
    borderColor: Colors.bordersStrong,
    borderRadius: 8,
    border: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  firstBtnContainer: { borderColor: Colors.bordersStrong, borderEndWidth: 1 },

  title: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginVertical: 10,
    textAlign: "center",
  },
});
