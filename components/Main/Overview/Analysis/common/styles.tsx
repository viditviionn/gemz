import {
  BLACK_COLOR_CODE,
  GREY_COLOR_CODE,
  LIGHT_GREY_COLOR_CODE,
  WHITE_COLOR_CODE,
} from "../../../../../constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {},
  chartHeading: {
    fontSize: 30,
    fontWeight: "500",
    color: BLACK_COLOR_CODE,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chartDetailWrap: {
    alignItems: "center",
    marginHorizontal: 30,
    margin: 5,
  },
  detailNameWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    height: 20,
    width: 20,
  },
  detailLabelView: { paddingVertical: 5 },
  detailLabelText: {
    fontWeight: "600",
    fontSize: 18,
    color: GREY_COLOR_CODE,
  },
  percentageText: { fontWeight: "600", fontSize: 18 },
  border: {
    borderWidth: 0.5,
    borderColor: LIGHT_GREY_COLOR_CODE,
    marginHorizontal: 40,
    marginVertical: 3,
  },
  selectedBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
  },
  innerBoxVw: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 5,
    minWidth: 50,
    borderWidth: 0.5,
    borderColor: LIGHT_GREY_COLOR_CODE,
    borderRadius: 3,
  },

  mainWrap: { flex: 1, alignItems: "center" },
  jcc: {
    justifyContent: "center",
  },
  centerTotalText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
    fontFamily: "Poppins",
    color: BLACK_COLOR_CODE,
  },
  centerTotalTextCount: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
    color: BLACK_COLOR_CODE,
  },
  chartDetailWrapPie: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 30,
  },
  detailLabelTextPie: {
    fontWeight: "600",
    fontSize: 18,
    width: "85%",
  },
  container: {
    backgroundColor: WHITE_COLOR_CODE,
    padding: 10,
    borderRadius: 10,
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins",
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
});

export default styles;
