import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "../../../../../hooks/useMutation";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import revalidate from "../../../../../lib/revalidate";
// import formatTriggerValues from "../../../../../lib/formatTriggerValues";

const URLs = {
  get: "/goals/{id}",
  post: "/goals/",
  put: "/goals/{id}/",
};

interface IGoals {
  name: string;
  asset_class_preference: string[];
  investment_horizon: string;
  return_expectations: string;
}

const assetClassPreferences = [
  {
    id: 1,
    name: "Equity",
    value: "equity",
  },
  {
    id: 2,
    name: "Fixed Income",
    value: "fixed_income",
  },
  {
    id: 3,
    name: "Alternatives",
    value: "alternatives",
  },
  {
    id: 4,
    name: "Cash",
    value: "cash",
  },
];

const returnExpectations = [
  {
    id: 1,
    name: "High",
    value: "high",
  },
  {
    id: 2,
    name: "Medium",
    value: "medium",
  },
  {
    id: 3,
    name: "Low",
    value: "low",
  },
];

function useEstate({ handleClear }: { handleClear: () => void }) {
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      revalidate("/goals/");
      handleClear();
      if (router.canGoBack()) {
        router.back();
      }
    },
    onError(err, key, config) {
      console.log("Error useEstate ", err, key, config);
    },
  });
  return { trigger, isMutating };
}

function useGetGoals(id?: string) {
  const { data, isLoading } = useTransactionServerQuery<IGoals>(
    id ? URLs.get.replace("{id}", id) : null,
  );
  return { data, isLoading };
}

function usePutEstate({
  goalId,
  handleClear,
}: {
  goalId: string;
  handleClear: () => void;
}) {
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", goalId), {
      onSuccess(data) {
        revalidate("/goals/");
        console.log("Success data upload", data);
        handleClear();
        if (router.canGoBack()) {
          router.back();
        }
      },
      onError(err, key, config) {
        console.log("Error data upload", err, key, config);
      },
    });
  return { update, isUpdating };
}

export default function GoalForm() {
  const { id, goal } = useLocalSearchParams<{ id: string; goal: string }>();
  const [value, setValue] = useState<IGoals>({
    name: "",
    asset_class_preference: [],
    investment_horizon: "",
    return_expectations: "",
  });

  const handleChange = (key: string, selectedValue: string) => {
    if (key === "asset_class_preference") {
      setValue((prev) => ({
        ...prev,
        [key]: prev[key].includes(selectedValue)
          ? prev[key].filter((value) => value !== selectedValue)
          : [...prev[key], selectedValue],
      }));
    } else {
      setValue((prev) => ({ ...prev, [key]: selectedValue }));
    }
  };

  const handleClear = () => {
    setValue({
      name: "",
      asset_class_preference: [],
      investment_horizon: "",
      return_expectations: "",
    });
  };

  const { trigger, isMutating } = useEstate({ handleClear });
  const { update, isUpdating } = usePutEstate({ goalId: id, handleClear });

  const handleSubmit = () => {
    const client = "637fbb50-d59d-467d-b61d-f99aa897b960";
    const payload = { client, ...value };
    if (id) {
      update(payload);
    } else {
      trigger(payload);
    }
  };

  const { data } = useGetGoals(id);

  useEffect(() => {
    setValue((prev) => ({ ...prev, name: goal }));
  }, []);

  useEffect(() => {
    if (data) {
      setValue({
        name: data.name,
        investment_horizon: data.investment_horizon,
        return_expectations: data.return_expectations,
        asset_class_preference: data.asset_class_preference,
      });
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <VStack space="lg">
        <VStack space="md">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">Name</FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                type="text"
                value={value.name}
                placeholder="Enter the Name"
                onChangeText={(value: string) => {
                  handleChange("name", value);
                }}
              />
            </Input>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Asset Class Preference
              </FormControlLabelText>
            </FormControlLabel>
            <HStack space="md" flexWrap="wrap">
              {assetClassPreferences.map((assetClassPreference) => {
                const isActive = value.asset_class_preference.includes(
                  assetClassPreference.value,
                );
                return (
                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      isActive && styles.activeSelectButton,
                    ]}
                    key={assetClassPreference.id}
                    onPress={() => {
                      handleChange(
                        "asset_class_preference",
                        assetClassPreference.value,
                      );
                    }}
                  >
                    <Text
                      style={[
                        styles.selectButtonText,
                        isActive && styles.activeSelectButtonText,
                      ]}
                    >
                      {assetClassPreference.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </HStack>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Return Expectations
              </FormControlLabelText>
            </FormControlLabel>
            <HStack space="md" flexWrap="wrap">
              {returnExpectations.map((returnExpectation) => {
                const isActive =
                  returnExpectation.value === value.return_expectations;
                return (
                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      isActive && styles.activeSelectButton,
                    ]}
                    key={returnExpectation.id}
                    onPress={() => {
                      handleChange(
                        "return_expectations",
                        returnExpectation.value,
                      );
                    }}
                  >
                    <Text
                      style={[
                        styles.selectButtonText,
                        isActive && styles.activeSelectButtonText,
                      ]}
                    >
                      {returnExpectation.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </HStack>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText size="sm">
                Investment Horizon
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="sm">
              <InputField
                type="text"
                value={value.investment_horizon}
                placeholder="Enter the Investment Horizon"
                onChangeText={(value: string) => {
                  handleChange("investment_horizon", value);
                }}
              />
            </Input>
          </FormControl>
        </VStack>

        <VStack space="md">
          <Button
            size="sm"
            onPress={handleSubmit}
            isDisabled={isMutating || isUpdating}
          >
            <ButtonText style={styles.buttonText}>Submit</ButtonText>
          </Button>
          <Button
            onPress={handleClear}
            variant="outline"
            size="sm"
            isDisabled={isMutating || isUpdating}
          >
            <ButtonText>Clear</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activeSelectButton: {
    backgroundColor: "#1890FF",
    borderRadius: 4,
    padding: 8,
  },
  activeSelectButtonText: {
    color: "white",
  },
  buttonText: {
    color: "white",
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
  },
  selectButton: {
    backgroundColor: "#DDEFFF",
    borderColor: "#1890FF",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  selectButtonText: {
    color: "black",
    fontSize: 12,
  },
});
