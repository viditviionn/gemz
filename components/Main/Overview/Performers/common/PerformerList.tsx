import React from "react";
import { FlatList } from "@gluestack-ui/themed";

import { type TGainerLoser } from "../../../../../interfaces/Main";
import { type IPerformerResult } from "../Performers";

import PerformerCard from "./PerformerCard";

interface IPlanningListProps {
  selectedTab: TGainerLoser;
  data: IPerformerResult[] | undefined;
}

export default function PerformerList({
  selectedTab,
  data,
}: IPlanningListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: IPerformerResult }) => (
        <PerformerCard
          data={item}
          selectedTab={selectedTab}
          key={item.security_description}
        />
      )}
      keyExtractor={(item: IPerformerResult) => item.profit_loss}
    />
  );
}
