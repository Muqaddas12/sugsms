import React, { useEffect, useState } from 'react';
import * as fs from 'expo-file-system';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const managePdfFiles = () => {
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

  const CreateNewPdfHandler = () => {
    console.log('Creating a new PDF...');
    console.log(files)
    // You can add logic for creating a new PDF here
  };
  const viewPdfHandler=()=>{
  
  }

  const renderPdfItem = ({ item }) => (
    <View style={{justifyContent:'space-between'}}>
          <TouchableOpacity onPress={viewPdfHandler}>
          <Text style={styles.pdfFileText}>{item} <Icon style={styles.icon} name='drive-file-rename-outline' size={24}/></Text>
     
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

      <View style={styles.createPdfContainer}>
        <TouchableOpacity style={styles.createButton} onPress={CreateNewPdfHandler}>
          <Text style={styles.buttonText}>Create New Pdf</Text>
        </TouchableOpacity>
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
  borderWidth:1,
  padding:10,
  borderRadius:5,
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
  icon:{
  
  }
});

export default managePdfFiles;
