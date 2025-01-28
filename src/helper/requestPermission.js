import React from "react";
import { PermissionsAndroid, Platform, Alert } from "react-native";

const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      // Request camera permission
      const permissionGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      
      // Request storage permission
      const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

      // Check if both permissions are granted
      if (
        permissionGranted !== PermissionsAndroid.RESULTS.GRANTED ||
        storagePermission !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Error', 'Please provide camera and storage permission to scan document');
        return false;
      }
    } catch (error) {
      console.error("Permission request failed", error);
      Alert.alert('Error', 'Failed to request permissions');
      return false;
    }
  }
  return true;
};

export default requestPermission;
