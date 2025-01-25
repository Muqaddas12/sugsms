import React from 'react';
import {Dimensions, View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../src/components/Navbar';
const {width,height}=Dimensions.get('window')
const About = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Shobhit University, Gangoh</Text>
          <Text style={styles.heroSubtitle}>Empowering Youth, Transforming India.</Text>
        </View>

        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Shobhit University, Gangoh</Text>
          <Text style={styles.sectionText}>
            Shobhit University, Gangoh, is a multidisciplinary university known for its strong emphasis on innovation, 
            research, and community service. Located in the serene environment of Gangoh, it is committed to providing 
            high-quality education and a transformative learning experience.
          </Text>
          <Text style={styles.sectionText}>
            The campus boasts state-of-the-art facilities, including modern laboratories, extensive libraries, 
            and vibrant student communities that contribute to a dynamic and engaging campus life.
          </Text>
        </View>

        {/* Mission and Vision Section */}
        <View style={styles.missionVisionContainer}>
          <View style={styles.missionVisionBox}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionText}>
              To develop a center of excellence in the fields of higher education, research, and entrepreneurship, 
              fostering an environment that empowers young minds and nurtures innovation.
            </Text>
          </View>
          <View style={styles.missionVisionBox}>
            <Text style={styles.sectionTitle}>Our Vision</Text>
            <Text style={styles.sectionText}>
              To be recognized globally as a hub for cutting-edge research, impactful education, and 
              holistic development of students, contributing to societal progress.
            </Text>
          </View>
        </View>

        {/* Highlights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Shobhit University Gangoh?</Text>
          <Text style={styles.listItem}>• Comprehensive undergraduate, postgraduate, and doctoral programs.</Text>
          <Text style={styles.listItem}>• Advanced infrastructure including research centers and smart classrooms.</Text>
          <Text style={styles.listItem}>• Strong placement network with leading organizations.</Text>
          <Text style={styles.listItem}>• A focus on holistic student development through extracurricular activities.</Text>
          <Text style={styles.listItem}>• Dedicated faculty members with international exposure and expertise.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            &copy; {new Date().getFullYear()} Shobhit University, Gangoh. All Rights Reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {   
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    backgroundColor: '#6200ea',
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    color: '#333',
  },
  missionVisionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  missionVisionBox: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  footer: {
    backgroundColor: '#6200ea',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default About;
