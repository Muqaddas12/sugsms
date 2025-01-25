import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { width, height } from "../src/wrapper/Dimensions";

const Status = () => {
    const [status,setStatus]=useState(null)
    const refreshButton=()=>{
       setStatus('pending')
        
    }
    useEffect(()=>{

        setStatus(null)
    },[])
    return (
        <View style={styles.statusWrapper}>
            <Navbar />
            <View style={styles.statusContainer}>
                <Text style={styles.textTitle}>Application Status</Text>

                {/* Status Messages */}
               {
               status && status==='approved'? <Text style={styles.textSuccess}>Your application has been approved.</Text>:(status==='pending'?<Text style={styles.textPending}>Your application is not approved yet.</Text>:<Text style={styles.textError}>It looks like you have not uploaded the pdf.</Text>)
                
               
          
               }

                {/* Refresh Button */}
                <TouchableOpacity onPress={refreshButton} style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Click Here to Refresh Status</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    statusWrapper: {
        width: width,
        flex: 1,
        height: height,
        backgroundColor: "#f8f8f8", 
        bottom:0,
 
    },
    statusContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", // Centering the content vertically
        paddingHorizontal: 20,
    },
    textTitle: {
        padding: 15,
        fontSize: 35,
        fontWeight: "bold",
        color: "#333", // Dark color for the title
        textAlign: "center",
    },
    textError: {
        color: "red",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    textSuccess: {
        color: "green",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    },
    textPending:{
        color: "#F29339",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
    
    },
    refreshButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#3498db", // Blue color for the button
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
    },
    refreshButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Status;
