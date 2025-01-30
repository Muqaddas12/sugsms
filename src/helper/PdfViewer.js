import {  Alert } from 'react-native';
// import * as fs from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';


const PdfViewer = (fileUri) => {

  // const sourceUri = 'file:///data/user/0/com.android.sugsms/files/file.pdf';
    // const file=fs.documentDirectory
    // const data=await fs.readDirectoryAsync(file)
    // console.log(data)
    console.log('from pdfviewer',fileUri)
    try {
      const status=FileViewer.open(fileUri)
      console.log('PDF opened successfully');
    } catch (error) {
      console.log('Error opening PDF:', error);
      Alert.alert('Error', 'Failed to open PDF');
    }
   
  };

  


export default PdfViewer;
