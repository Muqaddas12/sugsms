import React, { useState, useRef, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Navbar = () => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [registrationId, setRegistrationId] = useState(null);
  const [programmeName, setProgrammeName] = useState(null);
  const [email, setEmail] = useState(null);

  // Fetch user data from AsyncStorage inside useEffect
  useEffect(() => {
    const getUserData = async () => {
      const keys = ['name', 'image', 'registrationId', 'programmeName', 'email', 'Token'];
      const data = await AsyncStorage.multiGet(keys);
      const parsedData = Object.fromEntries(data);

      setName(parsedData.name);
      setImage(parsedData.image);
      setRegistrationId(parsedData.registrationId);
      setProgrammeName(parsedData.programmeName);
      setEmail(parsedData.email);
    };

    getUserData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slideAnimation = useRef(new Animated.Value(-width * 0.8)).current;

  const toggleMenu = () => {
    Animated.timing(slideAnimation, {
      toValue: isMenuOpen ? -width * 0.8 : 0, // Slide in or slide out
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const Logout=()=>{
router.push('/logout')
  }

  return (
    <SafeAreaView style={styles.navbarContainer}>
      {/* Navbar Header */}
      <View style={styles.navbarHeader}>
        <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
          <AntDesign name="menu-fold" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Shobhit University</Text>
       <View style={{flexGrow:1,alignItems:'flex-end'}}>
       <TouchableOpacity onPress={Logout}><AntDesign name="logout" size={23} color='white'/></TouchableOpacity>
       </View>
      </View>

      {/* Overlay Effect */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
      )}

      {/* Slide-In Menu */}
      <Animated.View
        style={[styles.menuContainer, { transform: [{ translateX: slideAnimation }] }]}
      >
        <View style={styles.userDetailsContainer}>
          <View style={styles.profileContainer}>
            <Image style={styles.userImage} source={{ uri: image }} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userDetailsText}>{name}</Text>
            <Text style={styles.userDetailsText}>{registrationId}</Text>
            <Text style={styles.userDetailsText}>{programmeName}</Text>
            <Text style={styles.userDetailsText}>{email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() =>router.push('homepage') } style={styles.menuItem}>
        <Icon style={styles.icon} name="home"/>
              <Text style={styles.menuItemText}>Homepage</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('profile')} style={styles.menuItem}>
            <AntDesign style={styles.icon}  name="user"/>
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('about')} style={styles.menuItem}>
            <AntDesign style={styles.icon}  name="infocirlce"/>
              <Text style={styles.menuItemText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('contactus')} style={styles.menuItem}>
            <AntDesign style={styles.icon}  name="customerservice"/>
              <Text style={styles.menuItemText}>ContactUs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('logout')} style={styles.menuItem}>
            <AntDesign style={styles.icon}  name="logout"/>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
    
     
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6200ea",
    paddingTop: 10,
    zIndex: 1000,
  },
  navbarHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navbarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  hamburger: {
    padding: 10,
  },
  menuContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    width: width * 0.75,
    backgroundColor: "#fff",
    zIndex: 2,
    height: height,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection:'row'
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    paddingTop:3,
  },
  userDetailsContainer: {
    backgroundColor: "#6200ea",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  userDetails: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  userDetailsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  icon:{
   fontSize:25,
   paddingRight:10,
   paddingTop:2,
  }
});

export default Navbar;
