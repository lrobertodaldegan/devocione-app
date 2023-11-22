import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    View,
}from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Label from '../components/Label';
import { Colors, Days } from '../utils';
import Button from '../components/Button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DevocionalService } from '../service/DevocionalService';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';
import { getBooks, getRandomVerse, getVerseFromCache } from '../service/BibleService'; 
import GrayButton from '../components/GrayButton';
import { useIsFocused } from '@react-navigation/native';
import BibleBook from '../components/BibleBook';
import Icon from '../components/Icon';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/7564787951';

export default function BibleScreen({navigation, route}) {

  const { book, chapter, verse } = route.params;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((result) => {
      if(result.status === 200)
        setBooks(result.books);
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

              <TouchableHighlight underlayColor={Colors.blue} 
                      onPress={() => navigation.goBack()} style={styles.goBackWrap}>
                  <Icon icon={faArrowLeft} label='Voltar' />
              </TouchableHighlight>
            </>
          )
        }}
        data={books}
        keyExtractor={(item) => item.name}
        renderItem={ ({item}) => <BibleBook abrev={item.abbrev.pt} label={item.name} chapters={item.chapters}/>}
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