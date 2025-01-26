import { NativeModules, PermissionsAndroid, Alert } from 'react-native';
import * as fs from 'expo-file-system';
const { CreatePdfModule } = NativeModules;

const requestPermissions = async () => {
  try {
    // Request permissions for reading and writing to storage
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    // Check if permissions were granted
    if (
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Storage permissions granted');
      return true;
    } else {
      console.log('Storage permissions denied');
      Alert.alert('Permission Denied', 'You need to grant storage permissions to create a PDF');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const CreatePdf = async () => {
  try {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const imagesPath = 'file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/';
    const imagesArray = await fs.readDirectoryAsync(imagesPath);
    const imagePaths = imagesArray.map(imageFileName => imagesPath + imageFileName);
    console.log('Image Paths:', imagePaths); // Debugging the paths

    const options = {
      imagePaths,            // Array of image file paths
      name: 'MyDocument.pdf', // PDF document name
      maxSize: { width: 800, height: 1000 },  // Optional: max image size
      quality: 0.8           // Optional: image quality (0 to 1)
    };

    // Calling the native module to create the PDF
    CreatePdfModule.createPDFbyImages(options)
      .then(result => {
        Alert.alert('PDF Created', `PDF saved at: ${result.filePath}`);
      })
      .catch(error => {
        console.error('Error creating PDF:', error);
        Alert.alert('Error', 'Failed to create PDF');
      });
  } catch (error) {
    console.error('Something went wrong in the PDF creation process:', error);
    Alert.alert('Error', 'Something went wrong while creating the PDF');
  }
};

export default CreatePdf;
