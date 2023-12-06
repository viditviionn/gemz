import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  Heading,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

import Listings from "../../components/Main/Overview/Listings";
import Colors from "../../constants/Colors";
import { AuthContext } from "../../context/AuthProvider";
import { useTransactionServerQuery } from "../../hooks/useQuery";

interface BankAccount {
  relationship_number: string;
  account_number: string;
  account_type: string | null; // You might want to specify the actual type here
  currency: string;
  meta: Record<string, any> | null;
  custodian: string;
}

interface Custodian {
  id: string;
  name: string;
}

interface Client {
  id: string;
  custodians: Custodian[];
  bank_accounts: BankAccount[];
  created_at: string;
  modified_at: string;
  name: string;
  display_picture: string | null;
  first_name: string;
  last_name: string | null;
  date_of_birth: string | null;
  nationality: string | null;
  identification_number: string | null;
  occupation: string | null;
  reporting_currency: string;
  tax_residency: string | null;
  risk_profile: string | null;
  email: string;
  phone_number: string | null;
  street: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  meta: Record<string, any> | null;
}

function useClient() {
  const { data, isLoading } = useTransactionServerQuery<Client[]>("/client/");
  return { data, isLoading };
}

export default function index() {
  const { data } = useClient();
  const authContext = useContext(AuthContext);

  const initializeAuthState = async () => {
    // Retrieve the access token from SecureStore
    const accessToken =
      await authContext.getTokenFromSecureStore("accessToken");
    if (data) {
      await authContext.saveTokenToSecureStore("clientId", data[0].id);
    }
    // If there is a stored access token, set the authentication state
    if (!accessToken) {
      router.replace("/(auth)/Onboarding");
    }
  };

  useEffect(() => {
    // Initialize the authentication state
    initializeAuthState();
  }, []);

  return (
    <View bg="#fff0f0" height="100%">
      <ScrollView>
        <VStack space="2xl" mt="$10" py="$5" px="$3">
          <HStack>
            <TouchableOpacity
              onPress={() => {
                router.push("/profile/Profile");
              }}
            >
              <Avatar>
                <AvatarFallbackText>Krish Parekh</AvatarFallbackText>
              </Avatar>
            </TouchableOpacity>
          </HStack>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack space="none">
              <Heading fontWeight="light">Welcome,</Heading>
              <Heading fontWeight="light">Krish Parekh</Heading>
            </VStack>
            <VStack>
              <Text size="sm" color={Colors.dark}>
                Your daily profit
              </Text>
              <Text size="sm" color={Colors.dark}>
                SGD 35K
              </Text>
            </VStack>
          </View>
          <Listings />
        </VStack>
      </ScrollView>
    </View>
  );
}
