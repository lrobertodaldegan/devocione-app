import React, {useEffect} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function GrayButton({
                                label, 
                                labelSize=16, 
                                icon, 
                                iconSize=10, 
                                align='center',
                                action=()=>null}) {
    return (
        <TouchableHighlight underlayColor={Colors.white} onPress={() => action()}>
            <View style={[styles.lblWrap, {justifyContent:align}]}>
                <Label value={label} style={styles.lbl} size={labelSize}/>

                <FontAwesomeIcon icon={icon} style={[styles.icon]} size={iconSize}/>
            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    lblWrap:{
        flexDirection:'row',
        alignItems:'center',
        alignContent:'center'
    },
    lbl:{
        color:Colors.gray
    },
    icon:{
        marginTop:5,
        marginLeft:5,
        color:Colors.gray
    }
});