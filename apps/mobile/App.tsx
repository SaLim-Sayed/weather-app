import React from 'react'
 // eslint-disable-next-line import/no-unresolved
import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';




import './global.css';


import { ImageBackground } from 'react-native';


export default function App() {
  return (
       <ImageBackground source={require("@repo/assets/images/main-bg.png")} className="flex-1 items-center justify-center">
        <ScreenContent title="Home" path="App.tsx">
        </ScreenContent>
        <StatusBar style="auto" />
      </ImageBackground>
  );
}


