import { StyleSheet } from "react-native";

import {
  BLACK_COLOR_CODE,
  GREY_COLOR_CODE,
  LIGHT_GREY_COLOR_CODE,
  WHITE_COLOR_CODE,
} from "../../../../../constants/Colors";

const styles = StyleSheet.create({
  border: {
    borderColor: LIGHT_GREY_COLOR_CODE,
    borderWidth: 0.5,
    marginHorizontal: 40,
    marginVertical: 3,
  },
  box: {
    height: 20,
    width: 20,
  },
  centerTotalText: {
    color: BLACK_COLOR_CODE,
    fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  centerTotalTextCount: {
    color: BLACK_COLOR_CODE,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
  },
  chartDetailWrap: {
    alignItems: "center",
    marginHorizontal: 30,
    margin: 5,
  },
  chartDetailWrapPie: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 30,
  },
  chartHeading: {
    color: BLACK_COLOR_CODE,
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  container: {
    backgroundColor: WHITE_COLOR_CODE,
    borderRadius: 10,
    padding: 10,
  },
  detailLabelText: {
    color: GREY_COLOR_CODE,
    fontSize: 18,
    fontWeight: "600",
  },
  detailLabelTextPie: {
    fontSize: 18,
    fontWeight: "600",
    width: "85%",
  },
  detailLabelView: { paddingVertical: 5 },

  detailNameWrap: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  innerBoxVw: {
    alignItems: "center",
    borderColor: LIGHT_GREY_COLOR_CODE,
    borderRadius: 3,
    borderWidth: 0.5,
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 5,
    minWidth: 50,
    paddingHorizontal: 15,
  },
  jcc: {
    justifyContent: "center",
  },
  mainContainer: {},
  mainWrap: { alignItems: "center", flex: 1 },
  percentageText: { fontSize: 18, fontWeight: "600" },
  selectedBox: {
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  selectedSwitchButton: {
    backgroundColor: "#1890FF",
  },
  selectedSwitchButtonText: {
    color: "#fff",
  },
  switchButton: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  switchButtonContainer: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 45,
    padding: 4,
  },
  switchButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: "black",
    fontFamily: "Poppins",
    fontSize: 16,
  },
});

export default styles;
