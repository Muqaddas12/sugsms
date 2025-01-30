import { createPdf } from 'react-native-images-to-pdf';
import * as FileSystem from 'expo-file-system';
const CreatePdf = async () => {

  // Use expo-file-system's document directory or cache directory
  const imagesPath = FileSystem.cacheDirectory + 'mlkit_docscan_ui_client/'; // Correct path for expo-file-system
  
  try {
    const imagesArray = await FileSystem.readDirectoryAsync(imagesPath);
  
    const pages = imagesArray.map(imageName => ({
      imagePath: `${imagesPath}${imageName}`
    }));
  
    console.log(pages);
  
    // Create directory inside the documentDirectory for saving the PDF
    const directoryUri = FileSystem.documentDirectory + 'scannedPdf/';
    await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
    console.log('Directory created successfully at: ', directoryUri);
  
    const date = Date.now(); // Correct way to get current timestamp
    const outputDirectory = directoryUri + `${date}_pdf.pdf`; // Save PDF in the 'scannedPdf' folder
  
    // Create the PDF
    const result = await createPdf({
      pages: pages, // Pass the pages array
      outputPath: outputDirectory, // Define output path
    });
 
    console.log(`PDF created successfully at: ${result}`);
 
    // Check if the PDF was saved correctly
    const data = await FileSystem.readDirectoryAsync(directoryUri);
    console.log('Files in directory:', data);
  
return true
  } catch (error) {
    console.error('Error occurred:', error);
    return false
  }
};

export default CreatePdf;
