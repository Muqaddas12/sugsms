import React, { useEffect, useState } from "react";
import { Text, View, Image, Alert, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import * as fs from 'expo-file-system';
import { width,height } from "../src/wrapper/Dimensions";

const ScannedImages = () => {
    const imagesPath = 'file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client';
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScannedImages = async () => {
            try {
              
                const imagesUri = await fs.readDirectoryAsync(imagesPath);
                setImages(imagesUri);
                setLoading(false);
                console.log(imagesUri);
            } catch (error) {
                Alert.alert('Error reading images');
                console.log('from ScannedImages', error);
                setLoading(false);
            }
        };
        fetchScannedImages();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.imagesContainer}>
                    {images && images.length > 0 ? (
                        images.map((image, index) => (
                            <Image
                                key={index}
                                style={styles.image}
                              
                            source={{ uri: `file:///data/user/0/com.android.sugsms/cache/mlkit_docscan_ui_client/${image}`}}
                            />
                        ))
                    ) : (
                        <Text style={styles.noImagesText}>No Scanned Images Found</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

// Styling
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,

        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: width*0.4,
        height: height*.3,
        margin: 10,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    noImagesText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default ScannedImages;
