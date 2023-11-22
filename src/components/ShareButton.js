import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Share,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import Label from './Label';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ShareButton({labelSize=14, iconSize=12, message}) {

  const onShare = async () => {
    try {
      await Share.share({message});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableHighlight underlayColor={Colors.white} onPress={onShare}>
      <View style={styles.lblWrap}>
        <Label value={'Compartilhar'} style={styles.lbl} size={labelSize}/>

        <FontAwesomeIcon icon={faPaperPlane} 
            style={[styles.icon]} 
            size={iconSize}/>
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