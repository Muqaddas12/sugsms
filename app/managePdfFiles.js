import React, { useEffect, useState } from 'react';
import * as fs from 'expo-file-system';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Alert, Image, ScrollView } from 'react-native';
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
  const imageDirectory = fs.documentDirectory + 'scannedImages/'; //for direct use in jsx
  const router = useRouter()

  const [isDirectoryExist, setIsDirectoryExist] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
  
  const [metadata,setMetadata]=useState([])
  const formatDate=(timestamp)=>{
    let date= new Date(timestamp*1000)

    let formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return formattedDate

  }


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

          const info=await Promise.all(
             pdfFilesList.map(async value=>{
              const data= await fs.getInfoAsync(pdfDirectoryPath+'/'+value)
           return{
            uri:(data.uri.replace('file:///data/user/0/','sdcard/')),
            creationTime:formatDate(data.modificationTime),
            size:data.size
           }
             })
          )
          setMetadata(info)
          
          

        } else {
          setIsDirectoryExist(false);  // Directory doesn't exist
          setPdfFiles([]);  // Clear files if directory doesn't exist
        }
   

      } catch (error) {
        console.log('Error while checking directories', error);
        setIsDirectoryExist(false);  // In case of an error, set the state accordingly
        setPdfFiles([]);  // Clear PDF files
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


  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.pdfContainer}>
        <Text style={styles.header}>Your PDF Files</Text>
        
                <ScrollView>
          {isDirectoryExist ? (
            metadata.map((value,index)=>(
              <View key={index}> 

                  <TouchableOpacity  onPress={()=>viewPdfHandler(pdfFiles[index])}>
                  <View style={styles.subcontainer}>
                    <View style={styles.ImageContainer}>
                      <Image 
                      style={styles.PdfIcon}
                      source={{uri:imageDirectory+(pdfFiles[index].replace('.pdf','.png'))}}/>
                    </View>
                    <View style={styles.pdfDetails}>
                    <Text style={styles.pdfName}>{pdfFiles[index]}</Text>
                   <View style={styles.pdfDAndS}>
                   <Text style={styles.pdfCreationDate}>{value.creationTime}</Text>
                   <Text style={styles.pdfSize}>{Math.round(value.size/1024/1024*100)/100} MB</Text>
                   </View>
             
        
                    </View>
                  
        
                  </View>
                  </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Directory doesn't exist</Text>
          )}

        </ScrollView>
      </View>


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
borderBottomWidth:0.2,
flexDirection:'row',
marginBottom:10,
width:'100%',
borderTopWidth:.2,
borderRightWidth:.2,


 },
ImageContainer:{
width:'25%',

alignItems:'center',
justifyContent:'center',
borderTopWidth:.2,
borderRightWidth:.2,
borderLeftWidth:.2

},
PdfIcon:{
width:'100%',
height:100,
  objectFit:'contain',
  marginVertical:'auto',
  
},
pdfDetails:{
  marginLeft:10,
  width:'60%',
  justifyContent:'center'
}
});

export default managePdfFiles;
