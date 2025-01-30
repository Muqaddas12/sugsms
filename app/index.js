import React, { useEffect, useState } from "react";
import { Link, useRouter,useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Text, TextInput, TouchableOpacity, Image, Alert,ActivityIndicator,StatusBar,View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../src/stylesheets/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
  
import { ActivityIndicatorLoading } from "../stylesheets/ActivityIndicator";
     

const Index = () => {
  const router=useRouter()
const [bGColor,setBGColor]=useState(null)
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading,setLoading]=useState(false)


  useEffect(()=>{
    const VerifyUser=async()=>{
   AsyncStorage.multiGet(['username','password']).then((userData=>{
       
        const username = userData[0][1];
        const password = userData[1][1];
        if((username&&password)){
          console.log(username,password)  
        handlePress(username,password)
      
        } 
      }))
  
      }
  
    VerifyUser() 
  },[])


  const handlePress = async (username,password) => {
console.log(username,password)
if(!(username&&password)){
 alert('please enter username or password')
  return 
}
  setLoading(true)
  setBGColor(styles.AIBG)
    const currentDate = new Date();
    const loginTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
   
    const payload = {
      email: username.length > 11 ? username : null,
      password: password,
      phone:'91-'+ ((username.length ===10) && (['6', '7', '8', '9'].includes(username.charAt(0)) )? username : null),
      registrationId: username.length > 10 && ['1', '2', '3', '4', '5'].includes(username.charAt(0)) ? username : null,
      browser: "Chrome",
      ip: null,  // Static IP address
      operatingSystem: "Windows", 
      deviceId: "2121291107", 
      deviceType: "BROWSER", 
      rememberMe: false, 
      loginTime: loginTime,
    };
  
    const url = "https://sug.digiicampus.com/rest/service/authenticate";

    try {
    
      const response = await axios.post(url, payload);  // Use `axios.post` directly and pass `payload` in `data`
      if (response.data.res.message === 'SUCCESS') {
        console.log(response.data.res.user)
              
        try {
          console.log('Storing the following data in AsyncStorage:');
          await AsyncStorage.multiSet([
            ['username',username],
            ['password',password],  
            ['name', response.data.res.user.name],
            ['phone',response.data.res.user.phone],
            ['image', response.data.res.user.photo],
            ['registrationId', response.data.res.user.registrationId],
            ['programmeName', response.data.res.user.programmeName],
            ['email',response.data.res.user.email], 
            ['Token', response.data.res.user.token],  
            ['ukid',`${response.data.res.user.ukid}`] , 
       
          ]);
        } catch (error) {    
          console.log(error) 
          Alert.alert('failed to login please try again')
          return
        }
        router.push({
          pathname: '/homepage',
        });// Navigate to homepage if successful
        setLoading(false)
      
      }
      else{
        Alert.alert('It look your phone/Email is not registered or Invalid')
      }
    } catch (error) {
      Alert.alert('Login Failed Please try again')
      console.error('Error during authentication:', error);
    }
    setBGColor(null)
    setLoading(false)
  };



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
        <Image 
          style={styles.logo}
          source={require('../assets/logo.png')}
        />
        <Text style={styles.title}>Shobhit University</Text>
        <Text style={styles.subtitle}>Scholarship Management System</Text>
        
        <TextInput
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter your Email/Phone/RegistrationId/RollNumber"
          placeholderTextColor="#aaa"
        />   
        <TextInput
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />   
    
        <TouchableOpacity
          onPress={()=>handlePress(username,password)}
          style={styles.button}
          accessible={true}
          accessibilityLabel="Sign in button"
        >    
          
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        
        <Text style={styles.infoText}>
          Forgot Password?{" "}
          <TouchableOpacity accessible={true} accessibilityLabel="Forgot Password button">
            <Link href={'/forgotpassword'}>Click Here!</Link>
          </TouchableOpacity>
        </Text>
       <View  style={[ActivityIndicatorLoading.loading,bGColor]}>
       <ActivityIndicator
      
       size={80}
        animating={loading}/>
       </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Index;
    