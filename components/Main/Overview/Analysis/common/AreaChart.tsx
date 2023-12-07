import React, { useEffect, useState } from "react";
import { Text as RNText } from "react-native";
import { View, Text } from "@gluestack-ui/themed";
import {
  VictoryArea,
  VictoryChart,
  VictoryClipContainer,
  VictoryStack,
} from "victory-native";
import { RANDOM_COLORS_ARRAY } from "../../../../../constants/Colors";
import { useAuthServerMutation } from "../../../../../hooks/useMutation";
import styles from "./styles";

export default function AreaChart(props: any) {
  const { headingText, apiEnd } = props;
  const [chartData, setChartData]: any = useState([]);
  const { trigger } = useAuthServerMutation(apiEnd, {
    onSuccess(data) {
      setChartData(data);
    },
  });
  useEffect(() => {
    trigger();
  }, []);
  const groupedData = chartData.reduce((result: any, item: any) => {
    const assetClass = item.asset_class;
    if (!result[assetClass]) {
      result[assetClass] = [];
    }
    result[assetClass].push(item);
    return result;
  }, {});
  const transformedData = Object.keys(groupedData).map((assetClass, index) => {
    return {
      name: assetClass,
      color: RANDOM_COLORS_ARRAY[index],
      data: groupedData[assetClass].map((item: any) => {
        return {
          x: new Date(item.date),
          y: Number(item.value % 1000),
        };
      }),
    };
  });
  const renderLegendItem = (item: any, index: any) => {
    return (
      <View
        key={index}
        style={[styles.innerBoxVw, { justifyContent: "flex-start" }]}
      >
        <View
          style={[styles.box, { backgroundColor: item.color, margin: 5 }]}
        />
        <View style={styles.detailLabelView}>
          <Text style={styles.detailLabelText}>{item?.name}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <RNText style={styles.chartHeading}>{headingText}</RNText>
      <View style={styles.selectedBox}>
        {transformedData?.map((item: any, index: any) =>
          renderLegendItem(item, index)
        )}
      </View>
      <VictoryChart height={500}>
        <VictoryStack>
          {transformedData.map((series: any, index: any) => {
            return (
              <VictoryArea
                key={index}
                data={series.data}
                style={{
                  data: {
                    fill: series.color,
                    opacity: 0.3,
                    stroke: series.color,
                    strokeWidth: 3,
                    strokeLinecap: "round",
                  },
                }}
                interpolation="natural"
                groupComponent={
                  <VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />
                }
              />
            );
          })}
        </VictoryStack>
      </VictoryChart>
    </View>
  );
}
