    {/* Menu Items */}
        <FlatList
          data={[
            { id: 1, label: "Home", link: "/homepage" },
            { id: 2, label: "Profile", link: "/profile" },
            { id: 4, label: "About", link: "/about" },
            { id: 3, label: "ContactUs", link: "/contactus" },
            { id: 5, label: "Logout", link: "/logout" },
          ]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
           
          )}
        />


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