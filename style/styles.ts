import { Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  container: {
    //flexGrow: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: "transparent",
  },
  justifyContentSpaceBetween: {
    justifyContent: "space-between",
  },
  borderRad30: {
    borderRadius: 30,
  },
  itemWH: {
    width: 200,
    maxHeight: 300,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  shadowHigh: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
