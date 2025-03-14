import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function WhiteButton({label, labelSize=18, icon=null, iconSize=15, action=()=>null}) {
    const renderIcon = () => {
        if(icon && icon !== null){
            return <FontAwesomeIcon icon={icon} style={[styles.icon]} size={iconSize}/>
        } else {
            return <></>
        }
    }
    
    return (
        <TouchableHighlight underlayColor={Colors.blue} onPress={() => action()}>
            <View style={styles.lblWrap}>
                <Label value={label} style={[styles.lbl]} size={labelSize}/>

                {renderIcon()}
            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    lblWrap:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        alignContent:'center'
    },
    lbl:{
        color:Colors.white
    },
    icon:{
        marginTop:5,
        marginLeft:5,
        color:Colors.white
    }
});