import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
}from 'react-native';
import {Colors} from '../utils/Colors';

export default function Card({content}) {
    return (
        <View style={styles.ctn} elevation={5}>
            {content}
        </View>
    )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    ctn:{
        alignItems:'center',
        width:screen.width - 20,
        minHeight:100,
        marginLeft:10,
        borderRadius:10,
        backgroundColor:Colors.white,
        position:'absolute',
        top:screen.height * 0.25,
        paddingVertical:20,
        paddingHorizontal:10
    },
});