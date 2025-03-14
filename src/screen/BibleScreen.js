import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    View,
}from 'react-native';
import { Colors } from '../utils';
import { changeChosedVerse, getBooks } from '../service/BibleService'; 
import BibleBook from '../components/BibleBook';
import BibleHeader from '../components/BibleHeader';
import Label from '../components/Label';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1717135646';

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
      let match = (book === item.name || book === item.abbrev.pt);

      if(book && match){
        return (
          <BibleBook abrev={item.abbrev.pt} 
              label={item.name} 
              chapters={item.chapters}
              verse={verse}
              chapter={chapter}
              expand={match}
              selectable={selectable === true}
              navigation={navigation}
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
            navigation={navigation}
        />
      )
    }
  }

  return (
    <FlatList contentContainerStyle={styles.ctn}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        ListHeaderComponent={
          <>
            <BibleHeader navigation={navigation}
                showlAllOptionEnabled={!showAllBooks}
                onShowAll={() => setShowAllBooks(!showAllBooks)}
            />

            <View styles={styles.versionWrap}>
              <Label value='Versão: NVI' style={{textAlign:'center'}}/>
            </View>
          </>
        }
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={renderListItem}
        ListEmptyComponent={
          <ActivityIndicator color={Colors.white} 
              style={{marginVertical:10}} size="small"
          />
        }
        ListFooterComponent={
          <View style={{alignItems:'center', marginTop:20}}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{requestNonPersonalizedAdsOnly: false,}}
            />

            <Label value='Por @lucasrobertodev' 
                style={{textAlign:'center', margin:20}}/>
          </View>
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
  },
  versionWrap:{
    alignItems:'center',
    justifyContent:'center',
    width:screen.width,
  },
});