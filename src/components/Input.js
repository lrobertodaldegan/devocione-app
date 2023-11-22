import React, {useState} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
}from 'react-native';
import {Colors} from '../utils/Colors';
import GrayButton from './GrayButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Input({label, value, onChange=(val)=>null}) {
  const [expanded, setExpanded] = useState(true);
  const [icon, setIcon] = useState(faChevronDown);

  const renderInput = () => {
    if(expanded === true){
      return (
        <TextInput value={value} 
            style={styles.input}
            onChangeText={(text) => onChange(text)}
            placeholder='Escreva um texto livre sobre este tópico...'
            placeholderTextColor={Colors.gray}
            textBreakStrategy='simple'
            multiline={true}
        />
      )
    } else {
      return <></>
    }
  }

  const handlePress = () => {
    let exp = !expanded;

    setExpanded(exp);
    
    setIcon(exp === true ? faChevronUp : faChevronDown);
  }

  return (
    <View style={styles.wrap}>
      <GrayButton icon={icon} label={label} 
          align='flex-start'
          action={() => handlePress()}/>

      {renderInput()}
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
  }
});