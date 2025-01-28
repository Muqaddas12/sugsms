import { createPdf } from 'react-native-images-to-pdf';
import * as fs from 'expo-file-system';

const CreatePdf = async () => {
  // Directory path where images are stored
  const imagesPath = 'file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/';
  
  // Read the directory and get the list of images
  const imagesArray = await fs.readDirectoryAsync(imagesPath);
  
  // Map to create the required object structure for pages
  const pages = imagesArray.map(imageName => ({
    imagePath: `${imagesPath}${imageName}`
  }));

  // Log the pages to check the structure
  console.log(pages);

  // Create the output path in the document directory
  const temp = fs.documentDirectory + '/scannedPdf/file.pdf';

  // Create the PDF
  createPdf({
    pages: pages, // Pass the pages array
    outputPath: temp, // Use the temp variable for the output path
  })
    .then(path => console.log(`PDF created successfully: ${path}`))
    .catch(error => console.log(`Failed to create PDF: ${error}`));
};

export default CreatePdf;
