import * as FileSystem from 'expo-file-system';
import { PDFDocument } from 'pdf-lib'; 
import { PermissionsAndroid } from 'react-native';

const FetchDataFromStorage = async () => {
    const storagePermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  const imagesUri='file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/'
      try {
        const data=await FileSystem.readDirectoryAsync(imagesUri)
        console.log(data)
      } catch (error) {
        console.log(error)
        
      }
};

export default FetchDataFromStorage;




// try {
//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();

//   // Add a page with custom size
//   const page = pdfDoc.addPage([600, 600]);
//   const { width, height } = page.getSize();

//   // Draw some text on the page
//   page.drawText('Hello, this is an app PDF!', {
//     x: 50,
//     y: height - 150,
//     size: 30,
//   });

//   // Save the PDF to a byte array
//   const pdfBytes = await pdfDoc.save();

//   // Convert the PDF bytes to a base64 string
//   const base64Pdf = pdfBytes.toString('base64');

//   // Set the path to save the PDF file
//   const savingPath = FileSystem.documentDirectory + 'hello.pdf';

//   // Write the base64 string to the document directory
//   await FileSystem.writeAsStringAsync(savingPath, base64Pdf.toString('base64'));

//   // Log the saved file path
//   console.log('PDF file created and saved at:', savingPath);
//   const path =FileSystem.documentDirectory
//   const data= await FileSystem.readDirectoryAsync(path)
//   console.log(data)
// } catch (error) {
//   console.error('Error in creating PDF:', error);
// }