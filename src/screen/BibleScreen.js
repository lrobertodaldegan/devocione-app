import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    ActivityIndicator,
}from 'react-native';
import { Colors } from '../utils';
import { changeChosedVerse, getBooks } from '../service/BibleService'; 
import BibleBook from '../components/BibleBook';
import BibleHeader from '../components/BibleHeader';

export default function BibleScreen({navigation, route}) {

  const { book, chapter, verse, selectable } = route.params;

  const [books, setBooks] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);

  useEffect(() => {
    getBooks().then((result) => {
      if(result.status === 200)
        setBooks(result.books);

      if(book && chapter && verse && (!selectable || selectable === false))
        setShowAllBooks(false);
    });
  }, []);

  const handleSelection = (txt) => {
    changeChosedVerse(txt)
      .then(() => navigation.navigate('Devocional', txt))
      .catch(() => navigation.navigate('Devocional', txt));
  }

  const renderListItem = ({item}) => {
    if(showAllBooks === false){
      if(book && book === item.name){
        return (
          <BibleBook abrev={item.abbrev.pt} 
              label={item.name} 
              chapters={item.chapters}
              verse={verse}
              chapter={chapter}
              expand={item.name === book}
              selectable={selectable === true}
          />
        )
      } else {
        return <></>
      }
    } else {
      return (
        <BibleBook abrev={item.abbrev.pt} 
            label={item.name} 
            chapters={item.chapters}
            verse={verse}
            chapter={chapter}
            expand={item.name === book}
            selectable={selectable === true}
            onVerseSelect={handleSelection}
        />
      )
    }
  }

  return (
    <FlatList contentContainerStyle={styles.ctn}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        ListHeaderComponent={
          <BibleHeader navigation={navigation}
              showlAllOptionEnabled={!showAllBooks}
              onShowAll={() => setShowAllBooks(!showAllBooks)}
          />
        }
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={renderListItem}
        ListEmptyComponent={
          <ActivityIndicator color={Colors.white} 
              style={{marginVertical:10}} size="small"
          />
        }
    />
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
    minHeight:screen.height,
    backgroundColor:Colors.blue,
    paddingHorizontal:10
  }
});