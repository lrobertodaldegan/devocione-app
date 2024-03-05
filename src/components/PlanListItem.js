import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import {Colors} from '../utils/Colors';
import Label from './Label';
import GrayButton from './GrayButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookBible, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1717135646';

export default function PlanListItem({
                                  item, 
                                  navigation,
                                  onSelect=(item, type)=>null,
                                  showAds=false,
                                  selected=false
                                }) {
  const renderAds = () => {
    if(showAds === true){
      return (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
        />
      );
    } else {
      return <></>
    }
  }

  const handleNavigation = () => {
    let chap = item.chap;
    
    if(item.chap.includes("-"))
      chap = item.chap.split("-")[0];

    navigation.navigate('Bible', {
      book:item.book, 
      chapter:chap, 
      verse:1,
    })
  }

  const handleSelection = () => {
    onSelect(item, item.type);
  }

  return (
    <View style={styles.wrap}>
      {renderAds()}

      <View style={styles.optWrap}>
        <TouchableHighlight underlayColor={Colors.white} 
            style={styles.checkBox}
            onPress={() => handleSelection()}>

          <FontAwesomeIcon icon={faCheckSquare} size={25}
              style={[
                styles.icon, 
                {color:selected === true ? Colors.green : Colors.gray}
              ]}
          />
        </TouchableHighlight>

        <View style={styles.dayWrap}>
          <Label value={`Dia ${new Number(item.id)+1}`} size={12}/>

          <View style={styles.verseWrap}>
            <Label value={`${item.book.toUpperCase()} : ${item.chap}`} size={16}
                style={styles.lbl}/>

            <GrayButton icon={faBookBible} label='Abrir na Bíblia'
                action={handleNavigation}/>
          </View>
        </View>
      </View>
    </View>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    justifyContent:'center',
    padding:10,
  },
  optWrap:{
    width:screen.width - 40,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10,
  },
  verseWrap:{
    flexDirection:'row',
    alignItems:'center',
  },
  checkBox:{
    width:(screen.width - 40) * 0.1
  },
  lbl:{
    marginRight:20
  }
});