import React from "react";
import { FlatList } from "@gluestack-ui/themed";

import { type IPositionsData } from "../Positions";

import PositionCard from "./PositionCard";

interface PositionListProps {
  data: IPositionsData[] | undefined;
}

export default function PositionList({ data }: PositionListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }: { item: IPositionsData }) => (
        <PositionCard data={item} />
      )}
      keyExtractor={(item: IPositionsData) => item.id}
    />
  );
}
