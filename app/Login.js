import React, {  useState } from "react";
import { Link } from "expo-router";
import { Text, TextInput, TouchableOpacity, Image,ActivityIndicator,View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../src/stylesheets/Authentication";
  
import { ActivityIndicatorLoading } from "../stylesheets/ActivityIndicator";
import HandleUserLogin from "../src/helper/HandleUserLogin";

const Index = () => {
const [bGColor,setBGColor]=useState(null)
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading,setLoading]=useState(false)
const handlePress=async () => {
    setLoading(true)
    
    await HandleUserLogin(username,password)
    setLoading(false)
}


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
        editable={loading?false:true}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter your Email/Phone/RegistrationId/RollNumber"
          placeholderTextColor="#aaa"
        />   
        <TextInput
        editable={loading?false:true}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />   
    
        <TouchableOpacity
          onPress={()=>!loading&&handlePress(username,password)}
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
    