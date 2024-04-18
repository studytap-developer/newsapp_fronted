
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, StatusBar, Dimensions } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

// Get device width and height
const { width, height } = Dimensions.get('window');

const Open_screen = ({ navigation }) => {
  const handleGetStarted = () => {
    console.log('Get Started button pressed');
    navigation.navigate('News');
  };
  const handletesting = () => {
    console.log('Get Started button pressed');
    navigation.navigate('Dummy');
  };
  // Home Screen content
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <StatusBar backgroundColor="black" barStyle="light-content" />

      
      <Image
        source={require('../assets/stnewslogo1.jpg')} // Replace with your ad image
        style={styles.adImage}
      />
      <Text style={styles.welcomeText}>Welcome To News Portal</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

     
    
   <View style={{position:'absolute', bottom: 60}}>
    <Text style={styles.productText}>Developed by - Shree Gajanana Enterprises LLP</Text>
   </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  adImage: {
    width: width * 0.9, // Use 90% of screen width
    height: height * 0.25, // Use 25% of screen height
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
  productText :{
    color:'white',
    fontSize: 15,
  }
});

export default Open_screen;


// // ====
