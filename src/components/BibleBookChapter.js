import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';
import { getChapter } from '../service/BibleService';

export default function BibleBookChapter({bookAbrev, chapter, onSelection=()=>null}) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState([]);

  const handleSelection = () => {
    let exp = !expanded;

    setExpanded(exp);

    if(exp === true && (!content || content.length < 1)){
      getChapter(bookAbrev, chapter).then((result) => {
        setContent(result.content.verses);
      });
    }
  }

  const renderContent = () => {
    //TODO
    return <></>
  }

  return (
    <View>
      <TouchableHighlight underlayColor={Colors.blue} 
          onPress={() => setExpanded(!expanded)} 
          style={[styles.chapOpt, expanded === true ? styles.chapSelected : {}]}>
        
        <Label key={chapter} value={`${chapter}`} size={16}/>
      </TouchableHighlight>

      {renderContent()}
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