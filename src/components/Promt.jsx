import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Promt = () => {
  const [pdfName, setPdfName] = useState('');

  const handleOk = () => {
    // You can process the pdfName or show it in an alert.
    Alert.alert('PDF Name:', pdfName);
  };

  const handleCancel = () => {
    setPdfName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.promtContainer}>
        <View style={styles.titleContainer}>
          <Text>Enter Pdf Name:</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter new name"
            value={pdfName}
            onChangeText={setPdfName}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleOk} style={styles.button}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  promtContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginBottom: 10,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Promt;
