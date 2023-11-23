import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';
import ShareButton from './ShareButton';

export default function ListItem({navigation, item, details}) {
  const renderResume = () => {
    if(item.msg)
      return item.msg;
    
    if(item.ctx)
      return item.ctx;

    if(item.revelation)
      return item.revelation;

    if(item.application)
      return item.application;

    if(item.txt)
      return item.txt;

    return '';
  }

  const buildShareText = () => {
    let msg = `Olá! Veja isso:\n\n`;

    msg = msg + `${item.title ? item.title + '\n\n' : ''}`;
    msg = msg + `${item.txt ? item.txt : ''}`;

    if(item.msg){
      msg = msg + `\n\nMensagem central do texto:\n`;
      msg = msg + `${item.msg}`;
    }

    if(item.ctx){
      msg = msg + `\n\nContexto:\n`;
      msg = msg + `${item.ctx}`;
    }

    if(item.revelation){
      msg = msg + `\n\nComo o texto revela Jesus:\n`;
      msg = msg + `${item.revelation}`;
    }

    if(item.application){
      msg = msg + `\n\nComo aplicar o texto ao dia-a-dia:\n`;
      msg = msg + `${item.application}`;
    }

    msg = msg + `\n\nApp Devocione: Versículos bíblicos para devocionais`;
    msg = msg + `\nQue Deus te abençoe!`;

    return msg;
  }

  return (
    <TouchableHighlight underlayColor={Colors.white} 
        onPress={() => navigation.navigate('Devocional', {devocional:item, details:details})}>
      <View style={styles.ctn} elevation={2}>
          <Label style={[styles.lbl]} value={`${item.dt}`}/>

          <Label style={[styles.lbl, styles.title]} 
              value={`${item.ref ? item.ref : ''} - ${item.title ? item.title : ''}`} 
              size={14} bold={true}/>

          <Label style={[styles.lbl, styles.msg]} 
              value={renderResume()} size={12}/>

          <ShareButton message={buildShareText()}/>
      </View>
    </TouchableHighlight>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    ctn:{
        width:screen.width - 20,
        minHeight:100,
        marginLeft:10,
        marginTop:10,
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