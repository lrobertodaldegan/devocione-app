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

export default function ShareButton({
                            labelSize=14, 
                            iconSize=12, 
                            message,
                            labelColor=Colors.blue,
                            iconColor=Colors.green
                          }) {

  const onShare = async () => {
    try {
      let msg = `${message}\n\nhttps://play.google.com/store/apps/details?id=com.devocione`;

      await Share.share({message: msg});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableHighlight underlayColor={Colors.white} onPress={onShare}>
      <View style={styles.lblWrap}>
        <Label value={'Compartilhar'} 
            style={[styles.lbl, {color:labelColor}]} 
            size={labelSize}/>

        <FontAwesomeIcon icon={faPaperPlane} 
            style={[styles.icon, {color:iconColor}]} 
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
  lbl:{},
  icon:{
    marginTop:5,
    marginLeft:5,
  }
});