import { useState } from 'react';
import { Alert } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import requestPermission from './requestPermission';
import * as fs from 'expo-file-system';

const useDocumentScanner = () => {
  const [scannedImage, setScannedImage] = useState([]);

  // Function to handle document scan
  const scanDocument = async () => {
    // Requesting permissions
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Please provide camera and storage permission to scan documents');
      return;
    }

    // Clean up cache if needed
    await cleanUpCache();

    // Start document scanning
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages && scannedImages.length > 0) {
        console.log('Scanned Images:', scannedImages);
        setScannedImage(scannedImages);  // Set the scanned images to state
      } else {
        Alert.alert('No document found', 'Try scanning again.');
      }
    } catch (error) {
      console.error('Error scanning document:', error);
      Alert.alert('Error', 'There was an issue scanning the document.');
    }
  };

  // Function to scan more documents and append to the existing ones
  const scanMoreDocument = async () => {
    try {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (scannedImages && scannedImages.length > 0) {
        setScannedImage(prevImages => [...prevImages, ...scannedImages]);  // Append scanned images to the list
      } else {
        Alert.alert('No new documents found', 'Please try scanning again.');
      }
    } catch (error) {
      console.error('Error scanning more documents:', error);
      Alert.alert('Error', 'Error in scanning more documents.');
    }
  };

  // Helper function to clean up cached files
  const cleanUpCache = async () => {
    try {
      const dicPath = 'file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/';
      await fs.deleteAsync(dicPath, { idempotent: true });
      console.log('Cache cleaned successfully');
    } catch (error) {
      console.error('Error cleaning up cache:', error);
    }
  };

  return { scannedImage, scanDocument, scanMoreDocument };
};

export default useDocumentScanner;
