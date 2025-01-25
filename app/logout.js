import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const logout = async () => {
  const router = useRouter();
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Remove all keys from AsyncStorage
    await AsyncStorage.multiRemove(keys);

    // Navigate to the homepage after successful logout
    router.push("/");

  } catch (error) {
    // If there is an error, alert the user
    console.error(error);
    alert("Something went wrong. Please try again.");
  }
};

export default logout;
