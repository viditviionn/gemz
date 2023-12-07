import { View, Text, FlatList } from "@gluestack-ui/themed";
import React from "react";
import { VictoryChart, VictoryLabel, VictoryPie } from "victory-native";
import { RANDOM_COLORS_ARRAY } from "../../../../../constants/Colors";
import { Text as RNText } from "react-native";
import styles from "./styles";
const PieChart = (props: any) => {
  const { handleDataPointClick, item } = props;

  function formatNumber(number: any) {
    if (Math.abs(number) >= 1e9) {
      return (number / 1e9).toFixed(2) + "B";
    } else if (Math.abs(number) >= 1e6) {
      return (number / 1e6).toFixed(2) + "M";
    } else if (Math.abs(number) >= 1e3) {
      return (number / 1e3).toFixed(2) + "K";
    }
    return number.toFixed(2);
  }
  const renderLegendItem = (item: any, index: any) => {
    return (
      <View key={index}>
        <View style={styles.chartDetailWrapPie}>
          <View style={styles.detailNameWrap}>
            <View
              style={[styles.box, { backgroundColor: item.color, margin: 10 }]}
            />
            <View style={[styles.detailLabelView, { width: "100%" }]}>
              <Text style={styles.detailLabelTextPie}>{item?.label}</Text>
            </View>
          </View>
          <Text style={styles.percentageText}>
            {((Math.abs(item?.y) / total) * 100).toFixed(2)}%
          </Text>
        </View>
        <View style={styles.border} />
      </View>
    );
  };
  // Transforming the API response to required data for pie chart
  const transformedData = item?.data?.map((item: any, index: any) => ({
    y: item.value,
    label: item.type,
    color: RANDOM_COLORS_ARRAY[index],
  }));
  // Calculate the total sum of values
  const total = transformedData?.reduce(
    (acc: any, cur: any) => acc + Math.abs(cur.y),
    0
  );
  const temp = item?.title?.replace("Gross Allocation by", "");
  const firstChar = temp.charAt(1).toUpperCase();
  const remainingChars = temp.slice(2);
  const title = `${firstChar}${remainingChars}`;
  return (
    <View style={styles.mainWrap}>
      <RNText style={styles.chartHeading}>{title}</RNText>
      <View>
        <VictoryChart height={400} domain={[]}>
          <VictoryPie
            data={transformedData}
            labelRadius={({ innerRadius }: any) => innerRadius + 20}
            radius={() => 170}
            innerRadius={90}
            colorScale={RANDOM_COLORS_ARRAY}
            style={{
              labels: {
                fill: "black",
                fontSize: 16,
                fontFamily: "poppins",
              },
            }}
            labelComponent={
              <VictoryLabel
                text={({ datum }) =>
                  `${((Math.abs(datum.y) / total) * 100).toFixed(2)}%`
                }
              />
            }
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPressIn: handleDataPointClick,
                },
              },
            ]}
          />
          <View style={styles.jcc}>
            <Text style={styles.centerTotalText}>Total</Text>
            <Text style={styles.centerTotalTextCount}>
              {`${formatNumber(total)} `}
            </Text>
          </View>
        </VictoryChart>
        <View style={{ marginBottom: 30 }}>
          <FlatList
            data={transformedData}
            renderItem={({ item, index }: any) => renderLegendItem(item, index)}
          />
        </View>
      </View>
    </View>
  );
};

export default PieChart;
