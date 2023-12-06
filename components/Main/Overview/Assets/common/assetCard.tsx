import React from "react";
import { Box, Text } from "@gluestack-ui/themed";

import { boxElevation } from "./utils";

import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
} from "victory-native";

export const AssetCard = ({ mb, title, value, total }: any) => {
  const percentage = parseInt(((value / total) * 100) as any, 10);
  const sampleData = [
    { x: "v2", y: 100 - percentage },
    { x: "v1", y: percentage },
  ];
  return (
    <Box
      mb={mb}
      px={36}
      py={14}
      flex={1}
      style={boxElevation}
      borderRadius={6}
      bg="$white"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text fontWeight="400" fontSize={15} lineHeight={22.5}>
          {title}
        </Text>
        <Text fontWeight="400" fontSize={15} lineHeight={22.5}>
          SGD $ {value.toLocaleString()}
        </Text>
      </Box>
      <Box width={100} left={-40} top={-40} maxHeight={70}>
        <VictoryChart width={200} height={200}>
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: "transparent" },
            }}
          />
          <VictoryPie
            startAngle={90}
            endAngle={-90}
            data={sampleData}
            innerRadius={35}
            width={200}
            height={200}
            colorScale={["#F1F3FF", "#004793"]}
            labels={() => null}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 12, fontFamily: "Inter", fontWeight: "500" }}
            x={100}
            y={90}
            text={`${parseInt(((value / total) * 100) as any, 10)}%`}
          />
        </VictoryChart>
      </Box>
    </Box>
  );
};
