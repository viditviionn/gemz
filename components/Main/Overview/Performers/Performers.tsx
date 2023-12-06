import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { Spinner, Text, VStack } from "@gluestack-ui/themed";

import Colors from "../../../../constants/Colors";
import { AuthContext } from "../../../../context/AuthProvider";
import { useTransactionServerQuery } from "../../../../hooks/useQuery";
import useReportDateRange from "../../../../hooks/useReportDateRange";
import { type TGainerLoser } from "../../../../interfaces/Main";
import buildURLSearchParams from "../../../../lib/buildURLSearchParams";
import { formatCompactNumber } from "../../../../lib/format";

import PerformerList from "./common/PerformerList";
import PerformerSwitch from "./common/PerformerSwitch";

export interface IPerformerCard {
  id: number;
  name: string;
  percentage: string;
  total_pl: string;
}

interface IGainerLoserProps {
  type: TGainerLoser;
}

export interface IPerformerResult {
  security_description: string;
  percentage_profit_loss: number;
  profit_loss: number;
}

interface IGainer {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerformerResult[];
  total_loss?: number;
  total_gain?: number;
}

const URLs = {
  gainer: "/position/history/top_gainer/",
  loser: "/position/history/top_loser/",
};

function useGainerLoser({ type }: IGainerLoserProps) {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const { startDate, endDate } = useReportDateRange();

  const { data, isLoading } = useTransactionServerQuery<IGainer>(
    `${URLs[type]}${buildURLSearchParams({
      client: client_id,
      start_date: startDate,
      end_date: endDate,
    })}`,
  );

  return {
    data,
    isLoading,
  };
}

export default function Performers() {
  const [selectedTab, setSelectedTab] = useState<TGainerLoser>("gainer");
  const { data, isLoading } = useGainerLoser({ type: selectedTab });

  const handleSelectedTab = (selectedTab: TGainerLoser) => {
    setSelectedTab(selectedTab);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack space="md">
      <PerformerSwitch
        selectedTab={selectedTab}
        setSelectedTab={handleSelectedTab}
      />
      {selectedTab === "gainer" ? (
        <Text fontWeight="light" color={Colors.dark}>
          Top Gain: {formatCompactNumber(data?.total_gain)}
        </Text>
      ) : (
        <Text fontWeight="light" color={Colors.dark}>
          Top Loss: {formatCompactNumber(data?.total_loss)}
        </Text>
      )}
      <SafeAreaView style={{ flex: 1 }}>
        <PerformerList selectedTab={selectedTab} data={data?.results} />
      </SafeAreaView>
    </VStack>
  );
}
