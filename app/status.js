import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import { width, height } from "../src/wrapper/Dimensions";
import WebView from "react-native-webview";

const Status = () => {
    const [session,setSession]=useState('')
    const [showWebView,setShowWebView]=useState(false)
    const [status,setStatus]=useState(null)
    const refreshButton=()=>{
       setStatus('pending')
        
    }
    useEffect(()=>{

        setStatus(null)
    },[])

    const handleWebViewPress = () => {
        if (session) {
            const sessionLength = session.length;
            
            if (sessionLength >= 4 && sessionLength < 5) {
                let secondNumber=Number(session[1])
                const fourthNumber=Number(session[3])
                // console.log(secondNumber,fourthNumber)
                secondNumber+=1
                if(secondNumber===fourthNumber){
                    setShowWebView(true)
                    return
                }{
                    Alert.alert('Error', 'Invalid Session');
                    return
                }
       
            } else {
                Alert.alert('Error', 'Invalid Session');
                return
            }
        } else {
            Alert.alert('Error', 'Invalid Session');
            return
        }
    };
    
    return (
        <View style={styles.statusWrapper}>
            <Navbar />
            {
                showWebView?(
                    <View></View>
                ):(
                    <View style={styles.statusContainer}>
                <Text style={styles.textTitle}>Application Status</Text>

                {/* Status Messages */}
               {
               status && status==='approved'? <Text style={styles.textSuccess}>Your application has been approved.</Text>:(status==='pending'?<Text style={styles.textPending}>Your application is not approved yet.</Text>:<Text style={styles.textError}>It looks like you have not uploaded the pdf.</Text>)
                
               
          
               }

                {/* Refresh Button */}
                <TouchableOpacity onPress={refreshButton} style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Refresh your application status</Text>
                </TouchableOpacity>
            </View>
                )
            }
           {
            showWebView?(
          
                <WebView source={{uri : 'https://scholarship.up.gov.in/status2223.aspx'}}
                 style={styles.webViewContainer}
                 scalesPageToFit={false}
               
                 />
              
            ):(
                <View style={styles.toShowWebViewContainer} >
                  
                    <Text style={{fontSize:width*.04,fontWeight:'bold'}}>Note:  The status on U.P. ScholarShip Website</Text>
                    <Text style={{fontSize:width*.04,fontWeight:'bold'}}>*************Instruction to enter session**************</Text>
                    <Text style={{fontSize:width*.04,fontWeight:'500'}}>If your session is 2024/25 Enter : 2425 </Text>
                    <Text></Text>
                    <TextInput
                    
                    style={{borderWidth:.5,width:width*.6,borderRadius:5,paddingHorizontal:12}}
                    onChangeText={setSession}
                    value={session}
                    keyboardType="numeric"
                    placeholder="Enter Session Value"
                    />

                <TouchableOpacity onPress={handleWebViewPress} style={styles.refreshButton}>
                <Text style={styles.refreshButtonText}>Check your status</Text>
            </TouchableOpacity>
            </View>
            )
           }
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
        flex:1,
        // height:height*.3,
        alignItems:'center'
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
        paddingHorizontal: width*.05,
        backgroundColor: "#3498db", // Blue color for the button
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
        width:width*.6,
    
    },
    refreshButtonText: {
        width:width*.5,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign:'center'
    
     
    },
    webViewWrapper:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
    flex:1,
    },
    webViewContainer:{
    
    },
    toShowWebViewContainer:{
        flex:1,
        alignItems:'center'
    }
});

export default Status;
