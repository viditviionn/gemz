import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
import { useAnalyticsServerGetQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import { ChevronDownIcon, X } from "lucide-react-native";

type TAsset = string[];

const URLS = {
  get: `/relative-performance/asset-class`,
};

function useAssetClass() {
  const { getClientId } = useContext(AuthContext);
  const client__id = getClientId();
  const { data } = useAnalyticsServerGetQuery<TAsset>(
    `${URLS.get}/${buildURLSearchParams({ client__id })}`,
  );

  const selectOptions =
    data?.map((item: string) => ({
      label: item,
      value: item,
    })) ?? [];

  return { selectOptions };
}

export default function SelectAssetClass() {
  const { selectOptions } = useAssetClass();
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Select
      onValueChange={(value: string) => {
        setSelectedOption(value);
      }}
      closeOnOverlayClick={true}
      selectedLabel={selectedOption}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select asset class" />
        <SelectIcon mr="$3">
          {selectedOption !== "" ? (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption("");
              }}
            >
              <Icon as={X} />
            </TouchableOpacity>
          ) : (
            <Icon as={ChevronDownIcon} />
          )}
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {selectOptions.map((item) => (
            <SelectItem
              label={item.label}
              value={item.value}
              key={item.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
