import { StyleSheet } from "react-native";

export const mainTheme = {
  backgroundColor: "#2c3e50",
  textColor: "#ecf0f6",
  borderColor: "#bdc3c7",
  placeholderColor: "#eee8",
  buttonPrimaryColor: "#2ecc71",
  buttonSecondaryColor: "#3498db",
  buttonDangerColor: "#e74c3c",
};

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: mainTheme.backgroundColor,
  },
  itemText: {
    color: mainTheme.textColor,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: mainTheme.buttonPrimaryColor,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  btnEdit: {
    backgroundColor: mainTheme.buttonSecondaryColor,
  },
  action: {
    padding: 5,
  },
  modalContainer: {
    backgroundColor: mainTheme.backgroundColor,
    padding: 5,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  label: {
    paddingVertical: 5,
    color: mainTheme.textColor,
  },
  input: {
    height: 40,
    borderColor: mainTheme.borderColor,
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    color: mainTheme.textColor,
    minWidth: "30%",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    padding: "5%",
    backgroundColor: mainTheme.backgroundColor,
  },
  separator: {
    height: 1,
    backgroundColor: mainTheme.primaryColor,
    marginVertical: 16,
  },
});
