import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import WhiteButton from './WhiteButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Label from './Label';
import BibleBookChapter from './BibleBookChapter';

export default function BibleBook({label, abrev, chapters=0}) {
  const [selected, setSelected] = useState(false);
  const [icon, setIcon] = useState(faChevronDown);

  const renderChapters = () => {
    if(selected === true){
      let opts = []
      
      for(let i=0; i < chapters; i++){
        opts.push(<BibleBookChapter bookAbrev={abrev} chapter={i+1}/>);
      }

      return (
        <View style={styles.chapWrap}>
          {opts}
        </View>
      )
    } else {
      return <></>
    }
  }

  const handlePress = () => {
    let slc = !selected;

    setSelected(slc);
    
    setIcon(slc === true ? faChevronUp : faChevronDown);
  }

  return (
    <View style={styles.wrap}>
      <WhiteButton icon={icon} label={label} 
          align='flex-start'
          action={() => handlePress()}/>

      {renderChapters()}
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