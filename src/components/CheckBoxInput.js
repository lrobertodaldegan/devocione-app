import React, {useState} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    TextInput,
    Dimensions,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import { faCheck, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function CheckBoxInput({
                                labelSize=16, 
                                iconSize=20, 
                                placeHolder='Novo motivo para interceder',
                                onSubmit=(value)=>null,
                              }) {
  const [value, setValue] = useState(null);

  const handleSubmit = () => {
    setValue(null);

    onSubmit(value);
  }

  return (
    <View style={[styles.lblWrap]}>
      <FontAwesomeIcon icon={faCheckSquare} size={iconSize}
          style={[styles.icon]}
      />

      <TextInput value={value} 
          style={[styles.input, {fontSize:labelSize}]}
          onChangeText={(text) => setValue(text)}
          placeholder={placeHolder}
          placeholderTextColor={Colors.gray}
          textBreakStrategy='simple'
          multiline={true}
      />

      <TouchableHighlight underlayColor={Colors.white} 
          onPress={() => handleSubmit()}>

        <FontAwesomeIcon icon={faCheck} size={iconSize}
            style={[styles.iconR]}
        />

      </TouchableHighlight>
    </View>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  lblWrap:{
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'flex-start',
    marginVertical:5
  },
  lbl:{
    color:Colors.gray
  },
  icon:{
    marginTop:5,
    marginRight:5,
    color:Colors.gray
  },
  iconR:{
    marginTop:5,
    marginLeft:5,
    color:Colors.green
  },
  input:{
    color:Colors.gray,
    fontFamily:'JosefinSans-Regular',
    width: screen.width * 0.6,
    borderBottomColor:Colors.gray,
    borderBottomWidth:1,
    padding:0
  }
});