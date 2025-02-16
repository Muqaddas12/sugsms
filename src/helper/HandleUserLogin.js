import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";
const HandleUserLogin=async (username,password) => {
    
    if(!(username&&password)){
     Alert.alert('please enter username or password')
      return 
    }
    
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
           
                  
            try {
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
                ['status','LoggedIn'],
           
              ]);
            } catch (error) {    
              console.log(error) 
              Alert.alert('failed to login please try again')
              return
            }
            router.push({
              pathname: '/homepage',
            });// Navigate to homepage if successful
         
          
          }
          else{
            Alert.alert('It look your phone/Email is not registered or Invalid')
          }
        } catch (error) {
          Alert.alert('Login Failed Please try again')
          console.error('Error during authentication:', error);
        }
     
      };
    
    
    



export default HandleUserLogin