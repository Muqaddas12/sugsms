import React, { useEffect, useState } from 'react';
import * as fs from 'expo-file-system';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Alert, Image } from 'react-native';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import PdfViewer from '../src/helper/PdfViewer';
import prompt from 'react-native-prompt-android';
import { useRouter } from 'expo-router';
import { width, height } from '../src/wrapper/Dimensions';
import * as DocumentPicker from 'expo-document-picker'
import * as Sharing from 'expo-sharing'





const managePdfFiles = () => {
 const imageDirectory=fs.documentDirectory+'scannedImages/'
  const ImageFile=require('../assets/logo.png')
  const router = useRouter()

  const [isDirectoryExist, setIsDirectoryExist] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [pdfImages,setPdfImages]=useState([])
  const [metadata,setMetadata]=useState(null)

  useEffect(() => {
    const checkDirectories = async () => {
      try {
        // Checking the PDF directory
        const pdfDirectoryPath = fs.documentDirectory + 'scannedPdf';
        const pdfInfo = await fs.getInfoAsync(pdfDirectoryPath);
        if (pdfInfo.exists && pdfInfo.isDirectory) {
          const pdfFilesList = await fs.readDirectoryAsync(pdfDirectoryPath);
          console.log(pdfFilesList);
          setPdfFiles(pdfFilesList);  // Set the list of PDF files
          setIsDirectoryExist(true);  // Directory exists
        } else {
          setIsDirectoryExist(false);  // Directory doesn't exist
          setPdfFiles([]);  // Clear files if directory doesn't exist
        }

        // Checking the Images directory
        const imageDirectoryPath = fs.documentDirectory + 'scannedImages/';
        const imageInfo = await fs.getInfoAsync(imageDirectoryPath);
        if (imageInfo.exists && imageInfo.isDirectory) {
          const imageFilesList = await fs.readDirectoryAsync(imageDirectoryPath);
          console.log(imageFilesList);
          setPdfImages(imageFilesList);  // Set the list of image files
          const info= await Promise.all(
           imageFilesList.map(async (imageuri)=>{
           console.log('data from map',imageuri)

           })
          )
        } else {
          setPdfImages([]);  // Clear image files if directory doesn't exist
        }
      } catch (error) {
        console.log('Error while checking directories', error);
        setIsDirectoryExist(false);  // In case of an error, set the state accordingly
        setPdfFiles([]);  // Clear PDF files
        setPdfImages([]);  // Clear image files
      }

    
    };

    checkDirectories();
  }, []);

  const viewPdfHandler = (item) => {
    console.log(item)
    const fileUri = fs.documentDirectory + 'scannedPdf/' + item
    console.log(fileUri)
    PdfViewer(fileUri)
  }


  const renamePdf = async (item) => {

    console.log(item)
    prompt(
      'Enter new name for the PDF',
      '', // Initial value can be empty or you can set a default value
      async (newName) => {
        if (!newName) {
          return
        }
        const fileUri = fs.documentDirectory + 'scannedPdf/' + item
        const newFileUri = fs.documentDirectory + 'scannedPdf/' + newName + '.pdf'
        await fs.moveAsync({
          from: fileUri,
          to: newFileUri
        })
        Alert.alert('success', 'Successfully renamed')
        router.replace('/managePdfFiles')
        console.log('User entered new name:', newName); // Logs the new name entered by the user
      }

    );

    setLoading(false)
    console.log('hello')


  }
  const deletePdf = async (item) => {

    const fileuri = fs.documentDirectory + 'scannedPdf/' + item
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
      <TouchableOpacity onPress={() => viewPdfHandler(item)}>
        <Text style={styles.pdfFileText}>{item}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => renamePdf(item)}>
        <Icon style={styles.icon} name='drive-file-rename-outline' size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePdf(item)}>
        <AntDesign style={styles.icon} name='delete' size={24} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => renamePdf(item)}>
        <AntDesign style={styles.icon} name='sharealt' size={24} />
      </TouchableOpacity>
    </View>


  );

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.pdfContainer}>
        <Text style={styles.header}>Your PDF Files</Text>
        
                <View>
          {isDirectoryExist ? (
            pdfFiles.map((value,index)=>(
              <View key={index}> 

<View style={styles.subcontainer}>
                    <View style={styles.ImageContainer}>
                      <Image 
                      style={styles.PdfIcon}
                      source={{uri:imageDirectory+pdfImages[index]}}/>
                    </View>
                    <View style={styles.pdfDetails}>
                    <Text style={styles.pdfName}>{pdfFiles[index]}</Text>
                   <View style={styles.pdfDAndS}>
                   <Text style={styles.pdfCreationDate}>9 march 2025</Text>
                   <Text style={styles.pdfSize}>253 KB</Text>
                   </View>
                  <Text style={styles.pdfUri}>Uri</Text>
        
                    </View>
        <Text style={styles.pdfPages}>Pdf Pages</Text>
        
                  </View>
              </View>
            ))
          ) : (
            <Text>Directory doesn't exist</Text>
          )}

        </View>
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: width * .55

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
  pdfFiles: {

    flex: 1,
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 10
  },
  AIBG: {
    backgroundColor: 'white',
  },
 subcontainer:{
borderWidth:1,
flexDirection:'row'

 },
ImageContainer:{
width:'20%',
borderRightWidth:1,
alignItems:'center',
justifyContent:'center'

},
PdfIcon:{
  width:50,
  height:50,
  objectFit:'contain',
  marginVertical:'auto',
  
}
});

export default managePdfFiles;
