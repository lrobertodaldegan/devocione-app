import React, {useState} from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    View,
}from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {Colors} from '../utils/Colors';
import Label from './Label';
import { faCheckSquare, faX } from '@fortawesome/free-solid-svg-icons';

export default function CheckBox({
                                label, 
                                labelSize=16, 
                                iconSize=20, 
                                checked=false,
                                onSelection=(lbl, selected)=>null,
                                onDeletion=(lbl)=>null
                              }) {
  const [selected, setSelected] = useState(checked);

  const handleSelection = () => {
    let slctd = !selected;
    
    setSelected(slctd);

    onSelection(label, slctd);
  }

  return (
    <View style={[styles.lblWrap]}>
      <TouchableHighlight underlayColor={Colors.white} 
          onPress={() => handleSelection()}>

        <FontAwesomeIcon icon={faCheckSquare} size={iconSize}
            style={[
              styles.icon, 
              {color:selected === true ? Colors.green : Colors.gray}
            ]}
        />

      </TouchableHighlight>

      <Label value={label} size={labelSize} 
          style={[
            styles.lbl,
            {color:selected === true ? Colors.lightGray : Colors.gray}
          ]}
      />

      <TouchableHighlight underlayColor={Colors.white} 
          onPress={() => onDeletion(label)}>

        <FontAwesomeIcon icon={faX} size={12} 
            style={[
              styles.icon,
              {color:selected === true ? Colors.lightGray : Colors.gray},
              {marginLeft:10}
            ]}
        />

      </TouchableHighlight>
    </View>
  )
}

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
  }
});