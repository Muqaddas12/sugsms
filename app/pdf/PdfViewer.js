import React from 'react';
import { Button, Alert } from 'react-native';
import * as fs from 'expo-file-system'; // Make sure you're using Expo File System
import FileViewer from 'react-native-file-viewer';

const PdfViewer = () => {
  const sourceUri = 'file:///data/user/0/com.android.sugsms/files/created_pdf.pdf'; // Path to your PDF

  const openPdf =async () => {
    const file=fs.documentDirectory
    const data=await fs.readDirectoryAsync(file)
    console.log(data)
    // Prepend file:// to the URI for Android compatibility
    

    FileViewer.open(sourceUri)
      .then(() => {
        console.log('PDF opened successfully');
      })
      .catch((error) => {
        console.log('Error opening PDF:', error);
        Alert.alert('Error', 'Failed to open PDF');
      });
  };

  return (
    <Button title="Open PDF" onPress={openPdf} />
  );
};

export default PdfViewer;
