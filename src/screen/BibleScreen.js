import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    View,
}from 'react-native';
import { Colors } from '../utils';
import { faArrowLeft, faBook } from '@fortawesome/free-solid-svg-icons';
import { getBooks } from '../service/BibleService'; 
import BibleBook from '../components/BibleBook';
import Icon from '../components/Icon';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/7564787951';

export default function BibleScreen({navigation, route}) {

  const { book, chapter, verse } = route.params;

  const [books, setBooks] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);

  useEffect(() => {
    getBooks().then((result) => {
      if(result.status === 200)
        setBooks(result.books);

      if(book && chapter && verse)
        setShowAllBooks(false);
    });


  }, []);

  return (
    <FlatList contentContainerStyle={styles.ctn}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        ListHeaderComponent={() => {
          return (
            <>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{requestNonPersonalizedAdsOnly: false,}}
              />

              <View style={styles.headerBtnsWrap}>
                <TouchableHighlight underlayColor={Colors.blue} 
                        onPress={() => navigation.goBack()} style={styles.goBackWrap}>
                    <Icon icon={faArrowLeft} label='Voltar' />
                </TouchableHighlight>

                <TouchableHighlight underlayColor={Colors.blue} 
                        onPress={() => showAllBooks(true)} style={styles.goBackWrap}>
                    <Icon icon={faBook} label='Ver todos os livros' />
                </TouchableHighlight>
              </View>
            </>
          )
        }}
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          if(showAllBooks === false){
            if(book && book === item.name){
              return (
                <BibleBook abrev={item.abbrev.pt} 
                    label={item.name} 
                    chapters={item.chapters}
                    verse={verse}
                    chapter={chapter}
                    expand={item.name === book}
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
              />
            )
          }
        }}
    />
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
    minHeight:screen.height,
    backgroundColor:Colors.blue,
    paddingHorizontal:10
  },
  goBackWrap:{
    marginVertical:20,
  },
  headerBtnsWrap:{
    flex:'row',
    justifyContent:'space-between'
  },
});