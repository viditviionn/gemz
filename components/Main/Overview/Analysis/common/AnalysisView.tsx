import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { View } from "@gluestack-ui/themed";

import {
  useAuthServerMutation,
  useGetAuthServerMutation,
} from "../../../../../hooks/useMutation";
import DropDown from "../../../../General/DropDown";

import AreaChart from "./AreaChart";
import PieChart from "./PieChart";
import styles from "./styles";

interface IAnalysisViewProps {
  selectedTab: number;
}
export default function AnalysisView({ selectedTab }: IAnalysisViewProps) {
  const navigation: any = useNavigation();
  const [chartData, setChartData]: any = useState([]);
  const [dropdwnData, setDropdwnData]: any = useState([]);
  const { trigger } = useAuthServerMutation("gross-allocation/", {
    onSuccess(data) {
      setChartData(data);
    },
  });
  const { trigger: custodianTrigger }: any = useGetAuthServerMutation(
    "custodian",
    {
      onSuccess(data) {
        setDropdwnData(data);
      },
    }
  );
  useEffect(() => {
    trigger();
    custodianTrigger();
  }, []);
  const handleDataPointClick = (event: any, props: any) => {
    navigation.navigate("profile/Detail", { title: props.datum?.label });
  };

  if (selectedTab === 0) {
    return (
      <View style={styles.container}>
        <DropDown
          dropdwnData={dropdwnData}
          labelField={"name"}
          valueField={"id"}
          placeholder={"Select Custodian"}
          onChange={() => {}}
        />
        {chartData.map((item: any, index: any) => {
          return (
            <PieChart
              key={index}
              item={item}
              handleDataPointClick={(event: any, props: any) =>
                { handleDataPointClick(event, props); }
              }
            />
          );
        })}
        <AreaChart
          key={"Net Worth"}
          headingText={"Net Worth"}
          apiEnd={"gross-allocation/networth/"}
        />
        <AreaChart
          key={"P/L History"}
          headingText={"P/L History"}
          apiEnd={"gross-allocation/pl-history/"}
        />
      </View>
    );
  }
  return <View></View>;
}
