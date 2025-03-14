import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function Button({
                            label, 
                            labelSize=18, 
                            icon, 
                            iconSize=15, 
                            action=()=>null,
                            labelColor=Colors.blue,
                            iconColor=Colors.green,
                            style={}
                        }) {
    return (
        <TouchableHighlight underlayColor={'transparent'} onPress={() => action()}>
            <View style={[styles.lblWrap, style]}>
                <Label value={label} 
                    style={[styles.lbl, {color:labelColor}]} size={labelSize}/>

                <FontAwesomeIcon icon={icon} 
                    style={[styles.icon, {color:iconColor}]} size={iconSize}/>
            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    lblWrap:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    lbl:{
        color:Colors.blue
    },
    icon:{
        marginTop:5,
        marginLeft:5,
        color:Colors.green
    }
});