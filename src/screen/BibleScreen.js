import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    FlatList,
}from 'react-native';
import { Colors, Days } from '../utils';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getBooks } from '../service/BibleService'; 
import BibleBook from '../components/BibleBook';
import Icon from '../components/Icon';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useScrollToTop } from '@react-navigation/native';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/7564787951';

export default function BibleScreen({navigation, route}) {

  const { book, chapter, verse } = route.params;

  const [books, setBooks] = useState([]);
  const [scrollRef, setScrollRef] = useState(null);

  useEffect(() => {
    getBooks().then((result) => {
      if(result.status === 200)
        setBooks(result.books);
    });
  }, []);

  handleAutomaticSelect = () => {
    //scrollRef?.scrollToIndex({index:10});
  }

  return (
    <FlatList contentContainerStyle={styles.ctn}
        ref={ref => {this.scrollView = ref; setScrollRef(ref);}}
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

              <TouchableHighlight underlayColor={Colors.blue} 
                      onPress={() => navigation.goBack()} style={styles.goBackWrap}>
                  <Icon icon={faArrowLeft} label='Voltar' />
              </TouchableHighlight>
            </>
          )
        }}
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          return (
            <BibleBook abrev={item.abbrev.pt} 
                label={item.name} 
                chapters={item.chapters}
                verse={verse}
                chapter={chapter}
                expand={item.name === book}
                onAutomaticSelect={handleAutomaticSelect}
            />
          )
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
    width:30,
    marginVertical:20,
  },
});