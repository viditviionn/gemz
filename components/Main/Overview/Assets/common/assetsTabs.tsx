import React, { useState } from "react";
import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";

import { Overview } from "./overview";
import { Stocks } from "./stocks";

function List(type: number): React.ReactNode {
  switch (type) {
    case 1:
      return <Overview />;
    case 2:
      return <Stocks />;
    default:
      return null;
  }
}

const assetsTabs = [
  { title: "Overview", id: 1 },
  { title: "Stocks", id: 2 },
];
const defaultActiveTab = assetsTabs[0].id;

export const AssetsTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  return (
    <Box flexDirection="column">
      <Text
        fontFamily="Poppins"
        fontWeight={"400"}
        fontSize={16}
        lineHeight={28}
      >
        Hi Krish Parekh,
      </Text>
      <Text
        fontFamily="Poppins"
        fontWeight={"400"}
        fontSize={16}
        lineHeight={28}
      >
        Now all your Assets are in one single place
      </Text>

      <HStack mx="$0" justifyContent="center" px="$2.5" mt="$3.5">
        {assetsTabs.map((tab: any) => {
          const isOverviewTabActive = tab.id === defaultActiveTab;
          return (
            <Pressable
              key={tab.id}
              my="$0.5"
              py="$6"
              flex={1}
              borderWidth={1}
              borderRightWidth={isOverviewTabActive ? 0 : 1}
              borderColor="#C4C4C4"
              onPress={() => {
                setActiveTab(tab.id);
              }}
              bg={activeTab === tab.id ? "#1890FF" : "white"}
              borderTopLeftRadius={isOverviewTabActive ? 6 : 0}
              borderBottomLeftRadius={isOverviewTabActive ? 6 : 0}
              borderBottomRightRadius={!isOverviewTabActive ? 6 : 0}
              borderTopRightRadius={!isOverviewTabActive ? 6 : 0}
            >
              <Text
                size="sm"
                color={activeTab === tab.id ? "$white" : "#4877CE"}
                textAlign="center"
                textTransform="uppercase"
                fontWeight={"500"}
                fontSize={16}
              >
                {tab.title}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
      {List(activeTab)}
    </Box>
  );
};
