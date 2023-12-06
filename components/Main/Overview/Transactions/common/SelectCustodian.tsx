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
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";

import { ChevronDownIcon, X } from "lucide-react-native";

export interface ICustodian {
  id: string;
  name: string;
}

function useCustodian() {
  const { getClientId } = useContext(AuthContext);
  const client__id = getClientId();
  const { data, isLoading } = useTransactionServerQuery<ICustodian[]>(
    `/custodian/${buildURLSearchParams({ client__id })}`,
  );
  return { data, isLoading };
}

export default function SelectCustodian() {
  const { data, isLoading } = useCustodian();
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <Select
      isDisabled={isLoading}
      onValueChange={(value: string) => {
        setSelectedOption(value);
      }}
      closeOnOverlayClick={true}
      selectedLabel={selectedOption}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select custodian" />
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
          {data?.map((item) => {
            return (
              <SelectItem label={item.name} value={item.id} key={item.id} />
            );
          })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
