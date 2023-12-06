import React, { useContext, useEffect, useState } from "react";
import { Spinner, VStack } from "@gluestack-ui/themed";

import { AuthContext } from "../../../../context/AuthProvider";
import {
  useAnalyticsServerQuery,
  useTransactionServerQuery,
} from "../../../../hooks/useQuery";
import useReportDateRange from "../../../../hooks/useReportDateRange";
import buildURLSearchParams from "../../../../lib/buildURLSearchParams";

import FamilyHead from "./common/Head";
import FamilyInvestment from "./common/Investment";

const URLs = {
  gainer: "/position/history/top_gainer/",
  gross_allocation: "/gross-allocation/",
  networth: "/statement/position/networth_cards/",
};

interface IGainerLoser {
  security_id: string;
  client_name: string;
  security_description: string;
  profit_loss: number;
}

interface ITopGainer {
  count: string;
  next: string;
  previous: string;
  results: IGainerLoser[];
}

export interface IPieData {
  type: string;
  value: number;
}

interface IData {
  x_label: string | null;
  y_label: string | null;
  data: IPieData[];
  metaData: string[] | [];
  title: string;
}

export interface IRelatedPositions {
  id: string;
  custodian_name: string;
  relationship_number: number;
  quantity: number;
  average_price: number;
  mtm_price: number;
  market_value: number;
  unrealised_pl: number;
}
export interface IPositionsData {
  id: string;
  custodian_name: string;
  client_name: string;
  security_name: string;
  isin: string;
  quantity: number;
  average_price: number;
  currency: string;
  mtm_price: number;
  asset_class: string;
  unrealised_pl: number;
  client: string;
  custodian: string;
  security: string;
  relationship_number: string;
  market_value: number;
  description: string;
  unrealised_pl_reporting: string;
  market_value_reporting: string;
  currency_reporting: string;
  related_positions: IRelatedPositions[];
}

export interface IPositionsResponse {
  count: number;
  next: string;
  previous: string;
  results: IPositionsData[];
}

export interface IPositionNetWorth {
  client_id: string;
  client_name: string;
  assets: number;
  liabilities: number;
  networth: number;
  currency: string;
}
export interface IPositionSearchResponse {
  client_cards: IPositionNetWorth[];
  company_card: IPositionNetWorth;
}

function useTopGainer() {
  const { startDate, endDate } = useReportDateRange();
  const { data, isLoading } = useTransactionServerQuery<ITopGainer>(
    `${URLs.gainer}${buildURLSearchParams({
      start_date: startDate,
      end_date: endDate,
    })}`,
  );
  return { data, isLoading };
}

function useGrossAllocation(client_id: string) {
  const { startDate, endDate } = useReportDateRange();
  const { data, isLoading } = useAnalyticsServerQuery<IData[]>(
    URLs.gross_allocation,
    {
      start_date: startDate,
      end_date: endDate,
      client_id,
    },
  );
  return { data, isLoading };
}

function useNetworth() {
  const { data, isLoading } =
    useTransactionServerQuery<IPositionSearchResponse>(URLs.networth);
  return { data, isLoading };
}

export default function Family() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const [totalGainer, setTotalGainer] = useState<number>(0);
  const [pieChart, setPieChart] = useState<IData>();
  const { data, isLoading } = useTopGainer();
  const { data: grossAllocation, isLoading: grossAllocationLoading } =
    useGrossAllocation(client_id);
  const { data: networth, isLoading: networthLoading } = useNetworth();
  useEffect(() => {
    if (data) {
      const total = data.results.reduce((acc, cur) => acc + cur.profit_loss, 0);
      setTotalGainer(total);
    }
  }, [data]);

  useEffect(() => {
    if (grossAllocation) {
      console.log("Gross Allocation", grossAllocation);
      setPieChart(grossAllocation[0]);
    }
  }, [grossAllocation]);

  if (isLoading || grossAllocationLoading || networthLoading)
    return <Spinner />;
  return (
    <VStack>
      {pieChart ? (
        <FamilyInvestment chartData={pieChart} totalGainer={totalGainer} />
      ) : (
        <Spinner />
      )}
      {networth?.client_cards?.map((networth: any, index: number) => (
        <FamilyHead networth={networth} key={index} />
      ))}
    </VStack>
  );
}
