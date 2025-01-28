import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const { width, height } = Dimensions.get("window");
import FetchDataFromStorage from "../helper/FetchDataFromStorage";
import CreatePdf from "../helper/createpdf";
const Footer = () => {
    const router=useRouter()
    const homeController=()=>{
       router.push('/homepage')
    }
    const pdffile=()=>{
      router.push('/managePdfFiles')
     
    }
    const infocirlce=()=>{
    router.push('/status')
    }
  return (
    <View style={styles.footerWrapper}>
      <View style={styles.footerContainer}>
       <TouchableOpacity onPress={homeController}>
       <AntDesign name="home" color="white" size={30} />
       </TouchableOpacity>
       <TouchableOpacity onPress={pdffile}>
       <AntDesign name="pdffile1" color="white" size={30} />
       </TouchableOpacity>
       <TouchableOpacity onPress={infocirlce}>
       <AntDesign name="infocirlce" color="white" size={30} />
       </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    position:'relative',
    alignItems: "center",
    marginBottom: 2,
  },
  footerContainer: {
    flexDirection:'row',

    height: height * 0.05, // Increased height for better space
    width: width * 0.8, // Smaller width for a cleaner look
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#3498db", // Changed to a blue background for contrast
    marginBottom: 2,
    borderTopRightRadius: 10, // More rounded corners
    borderTopLeftRadius: 10, // More rounded corners
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 }, // Slight shadow offset for depth
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
});

export default Footer;
