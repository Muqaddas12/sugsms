import React, { useEffect, useState } from 'react';
import * as fs from 'expo-file-system';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Alert,ActivityIndicator } from 'react-native';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import PdfViewer from '../src/helper/PdfViewer';
import prompt from 'react-native-prompt-android';
import { useRouter } from 'expo-router';
import { width,height } from '../src/wrapper/Dimensions';
import * as DocumentPicker from 'expo-document-picker'
import * as Sharing from 'expo-sharing'
const managePdfFiles = () => {
  const router=useRouter()

  const [isDirectoryExist, setIsDirectoryExist] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);

  // Handling to show PDF files created by the user
  useEffect(() => {
    const checkDirectory = async () => {
      try {
        const directoryPath = fs.documentDirectory + 'scannedPdf';

        const info = await fs.getInfoAsync(directoryPath);
        if (info.exists && info.isDirectory) {
          const files = await fs.readDirectoryAsync(directoryPath);
 
          setPdfFiles(files);  // Set the list of files
          setIsDirectoryExist(true);  // Directory exists
        } else {
          setIsDirectoryExist(false);  // Directory doesn't exist
          setPdfFiles([]);  // Clear files if directory does not exist
        }
      } catch (error) {
        console.log('Error while checking directory', error);
        setIsDirectoryExist(false);  // In case of an error, set the state accordingly
        setPdfFiles([]);
      }
    };

    checkDirectory();
  }, []);

  const CreateNewPdfHandler = async () => {
    console.log('Creating a new PDF...');
 // Launch document picker and allow user to pick a file
 try {
  // Launch document picker and allow user to pick a file
  const result = await DocumentPicker.getDocumentAsync({
    type: '*/*', // You can specify the types of files allowed, e.g., 'application/pdf'
  });
console.log(result.canceled)
  if (!result.canceled) {
    // User picked a document successfully
    console.log('Picked file:',result.assets[0].uri);

    // Now you can perform any operation you want with the picked file.
    // For example, you can show the PDF or save it to your app's directory.

    const fileUri = result.uri; // This is the path of the picked file
    // You can now use this URI to display or manipulate the PDF.
    // PdfViewer(fileUri); // Assuming you have a PdfViewer component to display the PDF
  } else {
    console.log('Document picker cancelled or no file selected.');
  }
} catch (error) {
  console.error('Error picking the document:', error);
  Alert.alert('Error', 'Failed to pick a document. Please try again.');
}
  };

  const viewPdfHandler=(item)=>{
  console.log(item)
  const fileUri=fs.documentDirectory+'scannedPdf/'+item
  console.log(fileUri)
PdfViewer(fileUri)
  }


  const renamePdf=async (item)=>{
    
    console.log(item)
    prompt(
      'Enter new name for the PDF',
      '', // Initial value can be empty or you can set a default value
      async (newName) => {
  if(!newName){
    return
  }
        const fileUri=fs.documentDirectory+'scannedPdf/'+item
        const newFileUri=fs.documentDirectory+'scannedPdf/'+newName+'.pdf'
        await fs.moveAsync({
          from:fileUri,
          to:newFileUri
        })
        Alert.alert('success','Successfully renamed')
        router.replace('/managePdfFiles')
        console.log('User entered new name:', newName); // Logs the new name entered by the user
      }
      
    );

    setLoading(false)
    console.log('hello')

    
  }
  const deletePdf=async(item)=>{

    const fileuri=fs.documentDirectory+'scannedPdf/'+item
    try {
      await fs.deleteAsync(fileuri)
      Alert.alert('Success', 'File deleted successfully');
      router.replace('/managePdfFiles')
    } catch (error) {
      console.error('Error deleting file:', error);
      Alert.alert('Error', 'Failed to delete file. Please try again');
    }

  }

  const renderPdfItem = ({ item }) => (
    <View style={styles.pdfFiles} >
          <TouchableOpacity  onPress={()=>viewPdfHandler(item)}>
          <Text style={styles.pdfFileText}>{item}</Text>
          </TouchableOpacity>

       <TouchableOpacity onPress={()=>renamePdf(item)}>
       <Icon style={styles.icon} name='drive-file-rename-outline' size={24}/>
       </TouchableOpacity>
    <TouchableOpacity onPress={()=>deletePdf(item)}>
    <AntDesign  style={styles.icon} name='delete' size={24} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>renamePdf(item)}>
    <AntDesign  style={styles.icon} name='sharealt' size={24} />
    </TouchableOpacity>
    </View>

    
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.pdfContainer}>
        <Text style={styles.header}>Your PDF Files</Text>
        {isDirectoryExist ? (
          pdfFiles.length > 0 ? (
            <FlatList
              data={pdfFiles}
              renderItem={renderPdfItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>No PDF files found</Text>
          )
        ) : (
          <Text>Directory doesn't exist</Text>
        )}
      </View>

      {/* <View style={styles.createPdfContainer}>
        <TouchableOpacity style={styles.createButton} onPress={CreateNewPdfHandler}>
          <Text style={styles.buttonText}>Create New Pdf</Text>
        </TouchableOpacity>
     
      </View> */}
    
      <Footer />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pdfFileText: {
    
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  borderWidth:1,
  padding:10,
  borderRadius:5,
  width:width*.55
  
  },
  createPdfContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  createButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pdfFiles:{
  
    flex:1,
    flexDirection:'row',

  justifyContent:'space-between',
  alignItems:'center',
 
  marginBottom:10
  },
  AIBG:{
    backgroundColor:'white',
  }
});

export default managePdfFiles;
