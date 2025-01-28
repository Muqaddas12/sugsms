import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import Navbar from "../src/components/Navbar";
import { useLocalSearchParams } from "expo-router";
import DocumentScanner from 'react-native-document-scanner-plugin';
import { AntDesign } from "@expo/vector-icons";
import Footer from "../src/components/Footer";
import CreatePdf from "../src/helper/createpdf";
import requestPermission from "../src/helper/requestPermission";
import * as fs from 'expo-file-system'
import { width,height } from "../src/wrapper/Dimensions";

const Homepage = () => {
  const [loading,setLoading]=useState(false)
  const { data } = useLocalSearchParams();
  const [scannedImage, setScannedImage] = useState([]);

  // Function to scan the document
  const scanDocument = async () => {
  //requesting permission
  const hasPermission=await requestPermission()
  if(!hasPermission){
    Alert.alert('please provide camera and storage permission to scan documents')
    return
  }
try {
  const dicPath='file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/'
  await fs.deleteAsync(dicPath,{idempotent:true})
  console.log('dicrectory deleted successfully')
} catch (error) {
  console.log('error deleting the dicrecotry',error)
}
    // Start document scanning
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages && scannedImages.length > 0) {
        console.log(scannedImages)
        setScannedImage(scannedImages);
      } else {
        Alert.alert('No document found', 'Try scanning again.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'There was an issue scanning the document.');
    }
  };

  // Function to scan more documents and append them to the existing ones
  const scanMoreDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages && scannedImages.length > 0) {
        setScannedImage(prevImages => [...prevImages, ...scannedImages]);
      }
    } catch (error) {
      alert('Error in scanning');
    }
  };
const handleCreatePdf=()=>{
CreatePdf()
}
  return (
    <View style={styles.container}>
      <Navbar data={data} />
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
              <TouchableOpacity style={styles.scanButton} onPress={scanMoreDocument}>
                <Text style={styles.scanButtonText}>Scan More</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scanButton} onPress={handleCreatePdf}>
                <Text style={styles.scanButtonText}>Submit Pdf</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Welcome to sugsms!</Text>
            <Text style={styles.errortext}>No document scanned yet.</Text>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.scanButton} onPress={scanDocument}>
                <Text style={styles.scanButtonText}>Click Here To Scan Document</Text>
              </TouchableOpacity>
          
            </View> 
             <ActivityIndicator size={'large'} animating={loading} />
          </View>
        )}
      </ScrollView>
     
{/** footer */}
<Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  mainContainer: {
     padding: 20,
     flexWrap:'wrap',
     flexDirection:'row',
     
  },
  footerContainer:{
alignItems:'center',
marginBottom:20
  },
  imageContainer:{
margin:5,
    width:width*0.4,

 

  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannedImage: {
    
    width: width*0.4,
  
    height: height * 0.3, // Adjust the image size
  
  },
  footer: {
    flexDirection:'row',
    marginTop: 20, // Provides spacing between images and button
    width: width,
    alignItems: 'center',
    marginBottom: 20, // Adds space at the bottom of the screen
   justifyContent:'space-evenly',
  },
  scanButton: {
    
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection:'row',
    
  },
  scanButtonText: {
    
    color: '#fff',
    fontSize: 18,
  },
  errortext: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default Homepage;
