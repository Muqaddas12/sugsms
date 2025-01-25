import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { styles } from '../src/stylesheets/Profile';
import Navbar from '../src/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = () => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);
  const [programmeName, setProgrammeName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
const [ukid,setUkid]=useState(null)
const [token,setToken]=useState(null)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Fetch user data from AsyncStorage inside useEffect
  useEffect(() => {
    const getUserData = async () => {
      const keys = ['name', 'phone', 'image', 'registrationId', 'programmeName', 'email', 'Token'];
      const data = await AsyncStorage.multiGet(keys);
      const parsedData = Object.fromEntries(data);

      setName(parsedData.name);
      setImage(parsedData.image);
      setRegistrationId(parsedData.registrationId);
      setProgrammeName(parsedData.programmeName);
      setEmail(parsedData.email);
      setPhone(parsedData.phone);
    };

    getUserData();
  }, []);

  const handlePasswordChange = () => {
    // Simple password validation
    if (newPassword !== repeatPassword) {
      Alert.alert('Error', 'New password and repeat password do not match');
    } else if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
    } else {
      // Handle password change logic here
      Alert.alert('Success', 'Password has been changed successfully');
    }
  };
  

  return (
    <View style={styles.container}>
      <Navbar />
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image source={{ uri: image }} style={styles.profilePicture} />
      </View>

      {/* User Details */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text>{phone}</Text>
        <Text>{registrationId} || {programmeName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      {/* Password Change Form */}
      <View style={styles.passwordChangeContainer}>
        <Text style={styles.sectionTitle}>Change Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Repeat New Password"
          secureTextEntry
          value={repeatPassword}
          onChangeText={setRepeatPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handlePasswordChange}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* Add additional action buttons if needed */}
      </View>
    </View>
  );
};

export default ProfilePage;
