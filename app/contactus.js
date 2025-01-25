import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Navbar from '../src/components/Navbar'; // Adapted Navbar component for React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = () => {
  const [name,setName]=useState(null)
  const [phone,setPhone]=useState(null)
  const [formMessage,setFormMessage]=useState('')
useEffect(()=>{
  const getUserDetails=async ()=>{
    const keys=['name','phone']
    const data=await AsyncStorage.multiGet(keys)
const userdata=Object.fromEntries(data)
  setName(userdata.name)
  setPhone(userdata.phone)
   }
   getUserDetails();
},[])



  return (
    <View style={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Heading and Instructions */}
      <View style={styles.header}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.description}>
          We would love to hear from you! Please fill out the form below and we'll be in touch soon.
        </Text>
      </View>

      {/* Contact Form */}
      <View style={styles.form}>
        {/* Name Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
           editable={false}
          />
        </View>

        {/* Email Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            editable={false}
           
          />
        </View>

        {/* Message Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your message here"
            multiline={true}
            numberOfLines={4}
            value={formMessage}
          
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop:80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactUs;
