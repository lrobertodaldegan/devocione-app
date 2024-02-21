import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
}from 'react-native';
import Label from '../components/Label';
import { Colors, Days } from '../utils';
import ShareButton from './ShareButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import Divider from './Divider';

export default function SearchBibleVerseItem({item, navigation}){
  const [date, setDate] = useState(null);
  const [text, setText] = useState({});

  useEffect(() => {
    let d = new Date();

    setDate(`${Days[d.getDay()]} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  }, []);

  useEffect(() => {
    setText(
      {
        ref:`${item.book.name} ${item.chapter}:${item.number}`,
        content:item.text,
        book:item.book.name,
        abrev:item.book.abbrev,
        chapter:item.chapter,
        verse:item.number,
        success:true
      }
    );
  }, []);

  return (
    <View style={styles.listItemWrap}>
      <Divider />

      <Label value={`${text.ref}:`} size={16}/>

      <Label value={`${text.content}`} size={14}/>

      <View style={styles.listItemActionsWrap}>
        <ShareButton labelColor={Colors.white} 
            message={`${text.ref}:\n${text.content}`}/>

        <Button label='Iniciar devocional' icon={faArrowRight} 
            labelColor={Colors.white} labelSize={14} iconSize={12}
            action={() => navigation.navigate('Devocional', {
              dt:date, 
              ref:text.ref, 
              text:`${text.content}\n\n${text.ref} NVI`,
              details:text
            })}
        />
      </View>

    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  listItemWrap:{
    marginVertical:10
  },
  listItemActionsWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginVertical:10,
    justifyContent:'space-between',
    alignItems:'center'
  },
});