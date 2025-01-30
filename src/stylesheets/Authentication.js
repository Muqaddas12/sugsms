import { StyleSheet } from "react-native";
import { width,height } from "../wrapper/Dimensions";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5e46b4", // Matching primary color from earlier contexts
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#555", // Slightly muted text
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333", // Input text color
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#5e46b4", // Primary color for button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff", // White text for contrast
    fontSize: 18,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
  
  },
  linkText: {
    fontSize: 16,
    color: "#5e46b4", // Primary color for links
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",

  },
  logo:{
    width:200,
    height:180,
    marginBottom:10,
  },
    signUPText: {
        fontSize: 16,
        color: "#5e46b4", // Primary color for links
        fontWeight: "bold",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    CheckBox:{
margin:10,
    },
    AIBG:{
      backgroundColor:'white',
    }
   
});
