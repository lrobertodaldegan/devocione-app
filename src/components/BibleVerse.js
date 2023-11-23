import React from 'react';
import {
    StyleSheet,
    View,
}from 'react-native';
import Label from '../components/Label';
import { Colors } from '../utils';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import GrayButton from '../components/GrayButton';

export default function BibleVerse({navigation, text}) {
  return (
    <>
      <Label value={`${text.content}`} 
          size={18} style={styles.txt} bold={true}/>

      <View style={styles.refWrap}>
        <Label value={`${text.ref} NVI`} 
            size={18} style={[styles.txt, styles.ref]} bold={true}/>

        <GrayButton label='Ver contexto' 
            labelSize={14}
            iconSize={10}
            icon={faBook} 
            action={() => navigation.navigate('Bible', {
              book:text.book, 
              chapter:text.chapter, 
              verse:text.verse
            })}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  txt:{
    color:Colors.blue,
    textAlign:'center'
  },
  ref:{
    marginRight:10,
    color:Colors.gray,
  },
  refWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20
  },
});