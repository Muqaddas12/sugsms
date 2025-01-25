import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const [loading,setLoading]=useState(false)
  const router = useRouter();
  const [isMobileNumber, setIsMobileNumber] = useState(false);
  const [otpSentStatus, setOtpSentStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // OTP Handler
  const handleOtp = async () => {
   
    setErrorMessage('');
    try {
      setLoading(true)
      if (username.length === 10) {
        setIsMobileNumber(true);
        const url = `https://sug.digiicampus.com/api/userManagement/passwordResetSms/91-${username}`;
        const response = await axios.post(url);

        if (response.status === 200) {
          Alert.alert('Success', 'OTP sent successfully');
          setOtpSentStatus(true);
        } else {
          setErrorMessage('Invalid Mobile Number or Email. Please try again.');
        }
        setLoading(false)
      } else {
        
        setIsMobileNumber(false);
        const url = `https://sug.digiicampus.com/api/userManagement/passwordResetMail/${username}`;
        const response = await axios.post(url);

        if (response.status === 200) {
          Alert.alert('Success', `A reset password link has been sent to ${username}`);
        }
      }
    } catch (error) {
      if (error.status === 400) {
        setErrorMessage('The Email/Phone is not registered');
      } else if(error.status===429) {
        setErrorMessage('Too Many Attempts. Please try again.');
      }
    }
    setLoading(false)
  };

  // Password Reset Handler
  const handleResetPassword = async () => {
    setUsername(username)
setOtp(otp)
setConfirmPassword(confirmPassword)
setPassword(password)
console.log(otp,password,confirmPassword,username)
   

    if (otp.length!==6) {
      setErrorMessage('Please enter a valid OTP.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
   

    const url = 'https://sug.digiicampus.com/api/userManagement/change/password';
    const payload = {
      phone: `91-${username}`,
      otp: otp,
      newPassword: password,
    };

    try {
      setLoading(true)
      const response = await axios.put(url, payload);
        Alert.alert('Success', 'Password changed successfully!');
        router.push({
          pathname:'/',
          params:{message:'Now login with your new password'}
        })
   
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
    setLoading(false)
  };

  useEffect(()=>{
    if(password.length!==12){
      setErrorMessage(' Password must be at least 12 and maximum 128 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.')
     }
  },[password,confirmPassword])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.description}>Enter your email or phone to reset your password.</Text>

      {/* Email/Phone Input */}
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Email Address/Phone"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity style={styles.button} onPress={handleOtp}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Password Form */}
      {isMobileNumber && otpSentStatus && (
        <View style={styles.resetForm}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <TextInput style={styles.input} value={username} editable={false} />
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={handleOtp}>
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )}
<ActivityIndicator animating={loading} />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetForm: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ForgotPassword;
