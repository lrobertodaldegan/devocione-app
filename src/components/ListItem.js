import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';
import Button from './Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ListItem({item}) {
    return (
        <View style={styles.ctn} elevation={2}>
            <Label style={[styles.lbl, ]} value={`${item.day} - ${item.dt}`}/>

            <Label style={[styles.lbl, styles.title]} value={`${item.txt} - ${item.title}`} 
                    size={14} bold={true}/>

            <Label style={[styles.lbl, styles.msg]} value={`${item.msg}`} size={12}/>

            <Button label={'Compartilhar'} icon={faPaperPlane} iconSize={10} labelSize={12}/>
        </View>
    )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    ctn:{
        width:screen.width - 20,
        minHeight:100,
        marginLeft:10,
        marginBottom:10,
        borderRadius:10,
        backgroundColor:Colors.white,
        paddingVertical:20,
        paddingHorizontal:10
    },
    lbl:{
        color:Colors.gray,
        textAlign:'center'
    },
    title:{
        textAlign:'left',
        color:Colors.blue
    },
    msg:{
        textAlign:'justify',
        marginVertical:10
    },
});