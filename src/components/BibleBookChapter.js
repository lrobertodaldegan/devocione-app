import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';

export default function BibleBookChapter({chapter, selected=false, onSelection=(chapterSelected)=>null}) {
  const [expanded, setExpanded] = useState(false);

  const handleSelection = () => {
    let exp = !expanded;

    setExpanded(exp);

    onSelection(chapter);
  }

  return (
    <View elevation={5}>
      <TouchableHighlight underlayColor={Colors.blue} 
          onPress={handleSelection} 
          style={[styles.chapOpt, selected === true ? styles.chapSelected : {}]}>
        
        <Label key={chapter} value={`${chapter}`} size={18}/>
      </TouchableHighlight>
    </View>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    marginBottom:15
  },  
  chapWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    maxWidth:screen.width - 20,
    paddingHorizontal:8,
    justifyContent:'center',
    marginTop:10
  },
  chapOpt:{
    width: (screen.width - 20) * 0.1,
    height: 40,
    borderRadius:5,
    backgroundColor:Colors.lightBlue,
    marginHorizontal:2,
    marginVertical:2,
    justifyContent:'center',
    alignItems:'center'
  },
  chapSelected:{
    borderWidth:2,
    borderColor:Colors.white,
    backgroundColor:Colors.blue,
  },
});