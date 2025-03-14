import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';
import { Days } from '../utils';
import ShareButton from './ShareButton';
import Button from './Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function BibleBookVerse({
                                book,
                                abrev,
                                chapterVerse, 
                                chapter,
                                bold=false, 
                                selectable=false, 
                                navigation,
                                onSelect=(text)=>null
                              }) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    let d = new Date();

    setDate(`${Days[d.getDay()]} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  }, []);

  const handleSelection = () => {
    if(selectable === true){
      let txt = {
        ref:`${book} ${chapter}:${chapterVerse.number}`,
        content:chapterVerse.text,
        book:book,
        abrev:abrev,
        chapter:chapter,
        verse:chapterVerse.number,
        success:true
      };

      onSelect({
        ...txt, 
        dt:date, 
        text:`${txt.content}\n\n${txt.ref} NVI`, 
        details:txt
      });
    }
  }
  
  return (
    <>
      <TouchableHighlight underlayColor={Colors.white} 
          onPress={handleSelection}>

        <View style={styles.wrap}>
          <Label key={chapterVerse.number} size={20} 
              value={`${chapterVerse.number} ${chapterVerse.text}`} 
              style={[
                styles.verseLbl, 
                {textAlign:'justify'},
                bold ? {fontFamily:'JosefinSans-Regular'} : {}
              ]}
              />
        </View>
      </TouchableHighlight>

      <View style={styles.listItemActionsWrap}>
        <ShareButton
            message={`${book} ${chapter}:${chapterVerse.number}:\n${chapterVerse.text}`}/>

        <Button label='Iniciar devocional' icon={faArrowRight} 
            labelSize={14} iconSize={12}
            action={() => navigation.navigate('Devocional', {
              dt:date, 
              ref:`${book} ${chapter}:${chapterVerse.number}`, 
              text:`${chapterVerse.text}\n\n${book} ${chapter}:${chapterVerse.number} NVI`,
              details:{
                ref:`${book} ${chapter}:${chapterVerse.number}`,
                content:chapterVerse.text,
                book:book,
                abrev:abrev,
                chapter:chapter,
                verse:chapterVerse.number,
                success:true
              }
            })}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    flexWrap:'wrap',
  },  
  verseLbl:{
    color:Colors.darkGray,
    fontFamily:'JosefinSans-Light',
    marginBottom:5
  },
  listItemActionsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginVertical:10,
    justifyContent:'space-between',
    alignItems:'center'
  },
});