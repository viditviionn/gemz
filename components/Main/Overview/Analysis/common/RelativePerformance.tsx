import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "@gluestack-ui/themed";

import { DownArrow } from "../../../../../assets/svgs";
import Colors from "../../../../../constants/Colors";
import { useRelativePerformanceServerQuery } from "../../../../../hooks/useMutation";
import { useAnalyticsServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import DropDownListItem from "./DropDownListItem";
import ListItem from "./ListItem";
import ToggleButton from "./ToggleButton";

import { MultiSelect } from "react-native-element-dropdown";
import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";

const LIST_TYPE = ["By Asset Class", "By Ticker"];
const TYPES = [
  { color: "#85A5FF", title: "Bonds & Equivalents" },
  { color: "#40A9FF", title: "Private Asset" },
  { color: "#95DE64", title: "Cash & Equivalents" },
  { color: "#36CFC9", title: "Fx & Equivalents" },
  { color: "#B37FEB", title: "Equity & Equivalents" },

  { color: "#85A5FF", title: "BABA UN" },
  { color: "#40A9FF", title: "BABA US" },
  { color: "#95DE64", title: "DXJ UP" },
  { color: "#36CFC9", title: "DXJ US" },
  { color: "#B37FEB", title: "GLIN UP" },
  { color: "#096DD9", title: "GLIN US" },
  { color: "#096DD9", title: "META" },
];

const client_id = "637fbb50-d59d-467d-b61d-f99aa897b960";

const apiEndPoints = {
  relativePerformanceNetworth: "/relative-performance/networth/",
  relativePerformanceStocks: "/relative-performance/stocks/",
};
const getColor = (title: string) =>
  TYPES.find((d) => d.title === title)?.color ?? Colors.Neutral5;

interface IGrowth {
  x: string;
  y: number;
  z: string;
}
interface IStocks {
  x: string;
  y: number;
  z: string;
}
const RelativePerformance = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<string[]>([]);

  const { data: assetsList = [], isLoading } = useAnalyticsServerQuery<
    string[]
  >(
    `/relative-performance/asset-class/${buildURLSearchParams({
      client_id,
    })}`,
  );

  const { data: tickerList = [] } = useAnalyticsServerQuery<string[]>(
    `/security/search/${buildURLSearchParams({
      client_id,
    })}`,
  );

  const isAssetsSelected = selectedIndex === 0;
  const LIST = isAssetsSelected ? selectedAssets : selectedTicker;
  const data = isAssetsSelected
    ? assetsList.map((item) => ({
        title: item,
      }))
    : tickerList.map((item) => ({
        title: item,
      }));
  const selected = isAssetsSelected ? selectedAssets : selectedTicker;
  const setSelected = isAssetsSelected ? setSelectedAssets : setSelectedTicker;

  const { trigger: fetchNetworth, data: networth = [] } =
    useRelativePerformanceServerQuery<unknown, IGrowth>(
      apiEndPoints.relativePerformanceNetworth,
    );

  const { trigger: fetchStocks, data: stocks = [] } =
    useRelativePerformanceServerQuery<unknown, IStocks>(
      apiEndPoints.relativePerformanceStocks,
    );

  if (isLoading) {
    return <Spinner size="small" />;
  }
  return (
    <View style={styles.contentContainer}>
      <View style={styles.rowContainer}>
        {LIST_TYPE.map((item, index) => {
          return (
            <ToggleButton
              key={`list=-${index}`}
              label={item}
              isSelected={selectedIndex === index}
              onPress={() => {
                setSelectedIndex(index);
              }}
            />
          );
        })}
      </View>

      <View style={styles.dropDownContainer}>
        <Text style={styles.assetsText}>
          {isAssetsSelected ? "Asset" : "Ticker"}
        </Text>
        <MultiSelect
          activeColor={Colors.Neutral3}
          style={styles.dropFieldBox}
          placeholderStyle={styles.dropDownPlaceholder}
          data={data}
          maxHeight={250}
          labelField="title"
          showsVerticalScrollIndicator={false}
          valueField="title"
          placeholder={isAssetsSelected ? "Search Asset" : "Search Ticker"}
          value={selected}
          onChange={(data) => {
            setSelected(data);
            if (isAssetsSelected) {
              fetchNetworth({
                asset_class: data,
                client_id,
                custodian_id: "",
                start_date: "",
                end_date: "",
              });
            } else {
              fetchStocks({
                client_id,
                security_id: data,
                start_date: "",
                end_date: "",
              });
            }
          }}
          containerStyle={styles.dropDownListContainer}
          renderSelectedItem={() => <View />}
          itemContainerStyle={{ borderRadius: 4 }}
          renderItem={({ title }) => {
            const color = getColor(title);
            return <DropDownListItem color={color} title={title} />;
          }}
          renderRightIcon={(open) => <DownArrow rotation={open ? 180 : 0} />}
        />
      </View>
      <View style={styles.assetsTypeContainer}>
        {LIST.map((item, index) => {
          const color = getColor(item);
          const removeFromSelectedItem = () => {
            setSelected((prev) => {
              return prev.filter((i) => i !== item);
            });
          };
          return (
            <ListItem
              key={index}
              title={item}
              color={color}
              onCloseIconPress={removeFromSelectedItem}
            />
          );
        })}
      </View>
      <VictoryChart
        width={350}
        padding={{ bottom: 100, top: 50, left: 90, right: 50 }}
      >
        <VictoryAxis
          style={{
            tickLabels: {
              angle: -55,
              textAnchor: "end",
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            grid: { stroke: Colors.Neutral5 },
          }}
        />
        {selected.map((item, index) => {
          const mainData = isAssetsSelected ? networth : stocks;
          const networthData = mainData.filter(({ z }) => {
            return z === item;
          });
          const color = getColor(item);

          return (
            <VictoryLine
              key={index}
              style={{
                data: { stroke: color },
                parent: { border: "1px solid #ccc" },
              }}
              data={networthData}
            />
          );
        })}
      </VictoryChart>
    </View>
  );
};

export default RelativePerformance;

const styles = StyleSheet.create({
  assetsText: {
    color: Colors.characterTitle85,
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  assetsTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
    marginHorizontal: 12,
  },
  contentContainer: {
    backgroundColor: Colors.Neutral1,
    borderRadius: 8,
    elevation: 5,
    padding: 16,
    shadowColor: "#47566B",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  dropDownContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 32,
  },
  dropDownListContainer: {
    borderRadius: 6,
    elevation: 6,
    padding: 4,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 1,
    shadowRadius: 28,
  },
  dropDownPlaceholder: {
    color: Colors.Neutral8,
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    marginVertical: 8,
  },
  dropFieldBox: {
    alignItems: "center",
    backgroundColor: Colors.Neutral1,
    borderColor: Colors.Neutral5,
    borderRadius: 6,
    borderWidth: 1,
    elevation: 2,
    flex: 1,
    marginStart: 16,
    overflow: "hidden",
    paddingHorizontal: 16,
    shadowColor: "rgba(0, 0, 0, 0.02)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  rowContainer: {
    backgroundColor: Colors.Neutral2,
    borderColor: Colors.Neutral3,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 30,
    marginVertical: 8,
    paddingVertical: 4,
  },
});
