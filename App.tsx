import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import mobileAds from 'react-native-google-mobile-ads';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar}from 'react-native';

import {Colors} from './src/utils/Colors';
import HomeScreen from './src/screen/HomeScreen';
import DevocionalScreen from './src/screen/DevocionalScreen';
import BibleScreen from './src/screen/BibleScreen';
import AboutScreen from './src/screen/AboutScreen';
import SearchScreen from './src/screen/SearchScreen';
import PlansScreen from './src/screen/PlansScreen';

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: '#06901E',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export default function App(): JSX.Element {
  mobileAds().initialize();

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={Colors.blue}/>
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions} />
          <Stack.Screen name="Devocional" component={DevocionalScreen} options={ScreenOptions} />
          <Stack.Screen name="Bible" component={BibleScreen} options={ScreenOptions} />
          <Stack.Screen name="About" component={AboutScreen} options={ScreenOptions} />
          <Stack.Screen name="Search" component={SearchScreen} options={ScreenOptions} />
          <Stack.Screen name="Plans" component={PlansScreen} options={ScreenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
