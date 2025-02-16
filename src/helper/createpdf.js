
import { createPdf } from 'react-native-images-to-pdf';

import * as FileSystem from 'expo-file-system';
const CreatePdf = async () => {

  const date = Date.now();
  const imagesPath = FileSystem.cacheDirectory + 'mlkit_docscan_ui_client/'; 
  
  
  try {
    const imagesArray = await FileSystem.readDirectoryAsync(imagesPath);
  
    const pages = imagesArray.map(imageName => ({
      imagePath: `${imagesPath}${imageName}`
    }));
    
    const imageDirectory=FileSystem.documentDirectory+'scannedImages/'
 await FileSystem.makeDirectoryAsync(imageDirectory,{intermediates:true})
 await FileSystem.copyAsync({
  from:imagesPath+imagesArray[0],
  to:imageDirectory+`${date}.png`,
 
 })
 console.log('file copy successfully')
  
    // Create directory inside the documentDirectory for saving the PDF
    const directoryUri = FileSystem.documentDirectory + 'scannedPdf/';
    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    console.log('Directory created successfully at: ', directoryUri);
  
   
    const outputDirectory = directoryUri + `${date}.pdf`; // Save PDF in the 'scannedPdf' folder
  
    // Create the PDF
    const result = await createPdf({
      pages: pages, // Pass the pages array
      outputPath: outputDirectory, // Define output path
    });
 
    console.log(`PDF created successfully at: ${result}`);
 
   
  
return true
  } catch (error) {
    console.error('Error occurred:', error);
    return false
  }
};

export default CreatePdf;
