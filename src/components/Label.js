import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
}from 'react-native';
import {Colors} from '../utils/Colors';

export default function Label({style={}, value, size=10, bold=false}) {
    return (
        <Text style={[styles.default, 
                        {fontSize:size}, 
                        {fontFamily:bold === true ? 'JosefinSans-Bold' : 'JosefinSans-Regular'}, 
                        style]}>
            {value}
        </Text>
    )
}

const styles = StyleSheet.create({
    default:{
        color:Colors.white,
    }
});