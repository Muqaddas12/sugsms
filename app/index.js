import React, { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

const Index = () => {


  useEffect(() => {
    const VerifyUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('status');
        if (userData) {
          console.log(userData);
          router.replace('homepage');
        } else {
          router.replace('Login');
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    VerifyUser();
  }, []);

  return (
    <View>
     
    </View>
  );
};

export default Index;
