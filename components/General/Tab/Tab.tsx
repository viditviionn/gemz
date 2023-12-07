import React from "react";
import { StyleSheet } from "react-native";
import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Image, Text } from "@gluestack-ui/themed";

import {
  BLACK_COLOR_CODE,
  BLUE_COLOR_CODE,
  GREY_COLOR_CODE,
  LIGHT_GREY_COLOR_CODE,
  SECOND_WHITE_COLOR,
} from "../../../constants/Colors";

const Tab = (props: any) => {
  const { item } = props;
  return (
    <GluestackUIProvider config={config}>
      <Box style={styles.mainView}>
        <Box style={styles.innerView}>
          <Text style={{ color: BLUE_COLOR_CODE, marginRight: 15 }}>
            {item.productId}
          </Text>
          <Box style={styles.countryStyle}>
            <Image
              size="2xs"
              borderRadius={8}
              source={{
                uri: "https://i.pinimg.com/236x/d2/c2/81/d2c2817ded4ef663fdb2ba1fff7c0c7c.jpg",
              }}
              alt=""
            />
            <Text style={{ color: GREY_COLOR_CODE }}>SGD</Text>
          </Box>
        </Box>
        <Box>
          <Text style={styles.textStyle}>
            Bond, Issuer: Oil India Ltd, Coupon: 5.125%, Maturity
          </Text>
          <Text style={styles.textStyle}>Date: 04-FEB-2029</Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Box
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: 50,
            }}
          >
            <Text style={styles.textHeadStyle}>Quantity</Text>
            <Text style={styles.textStyle}>{item.quantity}</Text>
          </Box>
          <Box
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={styles.textHeadStyle}>MTM Price</Text>
            <Text style={styles.textStyle}>{item.MTM_Price}</Text>
          </Box>
          <Box
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text style={styles.textHeadStyle}>Average Price</Text>
            <Text style={styles.textStyle}>{item.averagePrice}</Text>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Box
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: 50,
            }}
          >
            <Text style={styles.textHeadStyle}>Market Value</Text>
            <Text style={styles.textStyle}>{item.marketValue}</Text>
          </Box>
          <Box
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              height: 50,
              marginLeft: 15,
            }}
          >
            <Text style={styles.textHeadStyle}>Unrealized P&L</Text>
            <Text style={styles.textStyle}>{item.unrealized}</Text>
          </Box>
          <Box></Box>
        </Box>
      </Box>
    </GluestackUIProvider>
  );
};

export default Tab;

const styles = StyleSheet.create({
  countryStyle: {
    borderColor: SECOND_WHITE_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: 70,
  },
  innerView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  mainView: {
    borderColor: SECOND_WHITE_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    display: "flex",
    marginBottom: 20,
    marginHorizontal: 14,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  textHeadStyle: {
    color: BLACK_COLOR_CODE,
  },
  textStyle: {
    color: LIGHT_GREY_COLOR_CODE,
  },
});
