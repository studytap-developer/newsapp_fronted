import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import News from './screens/news';
import Open_screeen from './screens/open_screeen';
import JEEScreen from './screens/JEEScreen';
import JNTUKScreen from './screens/JNTUKScreen';
import JNTUHScreen from './screens/JNTUHScreen';
import JOBSScreen from './screens/JOBSScreen';
import UPSCScreen  from './screens/UPSCScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stacknavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>  
    <Stack.Navigator>
    <Stack.Screen name="Open" component={Open_screeen} options={{headerShown:false}} />
    <Stack.Screen name="News" component={News} options={{headerShown:false}} />
    <Stack.Screen name="JEE" component={JEEScreen} options={{headerShown:false}}  />
    <Stack.Screen name="JNTUK" component={JNTUKScreen} options={{headerShown:false}}  />
    <Stack.Screen name="JNTUH" component={JNTUHScreen} options={{headerShown:false}}  />
    <Stack.Screen name="JOBS" component={JOBSScreen} options={{headerShown:false}}  />
    <Stack.Screen name="UPSC" component={UPSCScreen} options={{headerShown:false}} />

        {/* Add other Stack.Screen components here */}

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Stacknavigator

const styles = StyleSheet.create({})

