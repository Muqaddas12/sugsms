import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Navbar from "../src/components/Navbar";

import Footer from "../src/components/Footer";
import CreatePdf from "../src/helper/createpdf";
import useDocumentScanner from "../src/helper/useDocumentScanner";

import { width, height } from "../src/wrapper/Dimensions";
import Promt from "../src/components/Promt";
const Homepage = () => {
  const { scannedImage, scanDocument, scanMoreDocument } = useDocumentScanner();
  const [loading, setLoading] = useState(false);

  const handleCreatePdf = async () => {
    setLoading(true);
    const result = await CreatePdf();
    setLoading(false);
    if (result) {
      Alert.alert("Sucess", "Pdf Created Sucessfully");
    } else {
      Alert.alert("Error ", "Error in creating pdf please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        {scannedImage.length > 0 ? (
          <>
            {scannedImage.map((image, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image
                  resizeMode="contain"
                  style={styles.scannedImage}
                  source={{ uri: image }}
                />
              </View>
            ))}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={scanMoreDocument}
              >
                <Text style={styles.scanButtonText}>Scan More</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={handleCreatePdf}
              >
                <Text style={styles.scanButtonText}>Upload and Save Pdf</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Shobhit University,Gangoh</Text>
            <Text style={styles.subgreetText}>
              Scholarship Management System
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.ActivityIndicatorContainer}>
        <ActivityIndicator
          style={styles.activityIndicatorIcon}
          animating={loading}
          size="100"
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.scanButton} onPress={scanDocument}>
          <Text style={styles.scanButtonText}>Click Here To Scan Document</Text>
        </TouchableOpacity>
        {/* <Text style={styles.alreadyText}>Already have scanned images?</Text>
              <TouchableOpacity style={styles.scanButton} onPress={scanDocument}>
                <Text style={styles.scanButtonText}>Click Here To Scan Document</Text>
              </TouchableOpacity>
              <Text style={styles.alreadyText}>Already have pdf?</Text>
              <TouchableOpacity style={styles.scanButton} onPress={scanDocument}>
                <Text style={styles.scanButtonText}>Click Here To Scan Document</Text>
              </TouchableOpacity> */}
      </View>
  
      {/** footer */}
      <Footer />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    padding: 20,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  footerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    margin: 5,
    width: width * 0.4,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
  },
  scannedImage: {
    width: width * 0.4,

    height: height * 0.3,
  },

  scanButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  subgreetText: {
    fontSize: 14,
    marginBottom: 20,
  },
  footer: {
    marginBottom: 20,
    flexDirection: "column",
    width: width,
    alignItems: "center",
  },
  ActivityIndicatorContainer: {
    flex: 1,
    position: "absolute",
    top: height * 0.5,
    left: width * 0.5,
    bottom: height * 0.5,
    right: width * 0.5,
  },
  alreadyText: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default Homepage;
