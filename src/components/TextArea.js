import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
}from 'react-native';
import {Colors} from '../utils/Colors';

export default function TextArea({value, onChange=(val)=>null}) {
  
  return (
    <View style={styles.wrap}>
      <TextInput value={value} 
          style={styles.input}
          onChangeText={(text) => onChange(text)}
          placeholder='Escreva um texto livre sobre este tópico...'
          placeholderTextColor={Colors.gray}
          textBreakStrategy='simple'
          multiline={true}/>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap:{
    marginBottom:15
  },  
  input:{
    borderRadius:5,
    borderWidth:1,
    borderColor:Colors.lightGray,
    padding:10,
    marginVertical:10,
    color:Colors.blue,
    fontFamily:'JosefinSans-Regular',
    minHeight:100
  }
});