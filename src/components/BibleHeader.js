import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import { faArrowLeft, faBook } from '@fortawesome/free-solid-svg-icons';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/7564787951';

import {Colors} from '../utils/Colors';
import Icon from './Icon';


export default function BibleHeader({navigation, showlAllOptionEnabled=false, onShowAll=()=>null}) {
  
  const renderRightAction = () => {
      if(showlAllOptionEnabled === true){
        return (
          <TouchableHighlight underlayColor={Colors.blue} 
              onPress={onShowAll} style={styles.goBackWrap}>
            <Icon icon={faBook} label='Ver todos os livros' />
          </TouchableHighlight>
        )
      } else {
        return <></>
      }
  }

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

        {renderRightAction()}
      </View>
    </>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  goBackWrap:{
    marginVertical:20,
  },
  headerBtnsWrap:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
});