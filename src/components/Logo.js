import React, {useEffect} from 'react';
import {
    ImageBackground,
    StyleSheet,
    Dimensions,
}from 'react-native';
import logo from '../asset/img/Devocione.png';


export default function Logo({navigation}) {
    return <ImageBackground source={logo} style={styles.logo} resizeMode='contain'/>
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    logo:{
        height:screen.height * 0.025,
        width:screen.height * 0.33,
    }
});