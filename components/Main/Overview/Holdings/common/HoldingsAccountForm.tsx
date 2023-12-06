import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
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
  VStack,
} from "@gluestack-ui/themed";

import { AuthContext } from "../../../../../context/AuthProvider";
import {
  useTransactionServerMutation,
  useTransactionServerPutMutation,
} from "../../../../../hooks/useMutation";
import { useTransactionServerQuery } from "../../../../../hooks/useQuery";
import { type ICustodian } from "../../../../../interfaces/Main";
import buildURLSearchParams from "../../../../../lib/buildURLSearchParams";
import formatTriggerValues from "../../../../../lib/formatTriggerValues";
import revalidate from "../../../../../lib/revalidate";

interface IFormValue {
  account_number: string;
  account_type: string;
  currency: string;
  relationship_number: string;
  custodian: string;
}

const URLs = {
  get: "/bank_account/{id}/",
  post: "/bank_account/",
  put: "/bank_account/{id}/",
};

function useBankAccount({ handleClear }: { handleClear: () => void }) {
  const { trigger, isMutating } = useTransactionServerMutation(URLs.post, {
    onSuccess() {
      revalidate("/bank_account/");
      handleClear();
      if (router.canGoBack()) {
        router.back();
      }
    },
    onError(err, key, config) {
      console.log("Error", err, key, config);
    },
  });
  return { trigger, isMutating };
}

function useGetBankAccount(id?: string) {
  const { data, isLoading } = useTransactionServerQuery<IFormValue>(
    id ? URLs.get.replace("{id}", id) : null,
  );
  return { data, isLoading };
}

function usePutEstate({
  holdingsId,
  handleClear,
}: {
  holdingsId: string;
  handleClear: () => void;
}) {
  const { trigger: update, isMutating: isUpdating } =
    useTransactionServerPutMutation(URLs.put.replace("{id}", holdingsId), {
      onSuccess() {
        revalidate("/bank_account/");
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

export default function HoldingsAccountForm() {
  const { getClientId } = useContext(AuthContext);
  const client_id = getClientId();
  const { id } = useLocalSearchParams();
  const holdingsId = Array.isArray(id) ? id[0] : id;
  const [value, setValue] = useState<IFormValue>({
    account_number: "",
    account_type: "",
    currency: "",
    relationship_number: "",
    custodian: "",
  });

  const { data: custodianData } = useTransactionServerQuery<ICustodian[]>(
    `/custodian/${buildURLSearchParams({
      client__id: client_id,
    })}`,
  );

  const options = custodianData?.map(({ id, name }) => ({
    name,
    id,
  }));

  const handleChange = (field: string, option: string) => {
    setValue({ ...value, [field]: option });
  };

  const handleSubmit = () => {
    const client = client_id;
    const payload = formatTriggerValues({ client, ...value });
    if (id) {
      update(payload);
    } else {
      trigger(payload);
    }
  };

  const handleClear = () => {
    setValue({
      account_number: "",
      account_type: "",
      currency: "",
      relationship_number: "",
      custodian: "",
    });
  };

  const { data } = useGetBankAccount(holdingsId);
  const { trigger, isMutating } = useBankAccount({ handleClear });
  const { update, isUpdating } = usePutEstate({ holdingsId, handleClear });

  useEffect(() => {
    if (data) {
      setValue({
        ...data,
      });
    }
  }, [data]);

  return (
    <VStack style={styles.container}>
      <VStack space="lg">
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="sm">Custodians</FormControlLabelText>
          </FormControlLabel>
          <HStack space="md">
            {options?.map(({ id, name }) => (
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  id === value.custodian && styles.activeSelectButton,
                ]}
                key={id}
                onPress={() => {
                  handleChange("custodian", id);
                }}
              >
                <Text
                  style={[
                    styles.selectButtonText,
                    id === value.custodian && styles.activeSelectButtonText,
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </HStack>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="sm">
              Account number
            </FormControlLabelText>
          </FormControlLabel>
          <Input size="sm" borderColor="black">
            <InputField
              placeholder="Account Number"
              type="text"
              value={value.account_number}
              onChangeText={(value: string) => {
                handleChange("account_number", value);
              }}
              returnKeyType="next"
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="sm">Account Type</FormControlLabelText>
          </FormControlLabel>
          <Input size="sm" borderColor="black">
            <InputField
              placeholder="Account type"
              type="text"
              value={value.account_type}
              onChangeText={(value: string) => {
                handleChange("account_type", value);
              }}
              returnKeyType="next"
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="sm">
              Relationship Number
            </FormControlLabelText>
          </FormControlLabel>
          <Input size="sm" borderColor="black">
            <InputField
              placeholder="Relationship number"
              type="text"
              value={value.relationship_number}
              onChangeText={(value: string) => {
                handleChange("relationship_number", value);
              }}
              returnKeyType="next"
            />
          </Input>
        </FormControl>
        <FormControl>
          <FormControlLabel>
            <FormControlLabelText size="sm">Currency</FormControlLabelText>
          </FormControlLabel>
          <Input size="sm" borderColor="black">
            <InputField
              placeholder="Currency"
              type="text"
              value={value.currency}
              onChangeText={(value: string) => {
                handleChange("currency", value);
              }}
              returnKeyType="next"
            />
          </Input>
        </FormControl>
      </VStack>
      <VStack space="md">
        <Button onPress={handleSubmit} isDisabled={isMutating || isUpdating}>
          <ButtonText>Submit</ButtonText>
        </Button>
        <Button
          variant="outline"
          onPress={handleClear}
          isDisabled={isMutating || isUpdating}
        >
          <ButtonText>Clear</ButtonText>
        </Button>
      </VStack>
    </VStack>
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
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
  selectButton: {
    backgroundColor: "#DDEFFF",
    borderColor: "#1890FF",
    borderRadius: 4,
    borderWidth: 1,
    padding: 8,
  },
  selectButtonText: {
    color: "black",
  },
});
