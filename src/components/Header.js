import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
}from 'react-native';
import { faArrowLeft, faBars, faFloppyDisk, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/7564787951';

import {Colors} from '../utils/Colors';
import Logo from './Logo';
import Icon from './Icon';

export default function Header({
                          navigation, 
                          showActions=false, 
                          onSave=()=>null, 
                          onShowModal=()=>null
                        }) {

  const renderLeftAction = () => {
    if(showActions === true){
      return (
        <TouchableHighlight underlayColor={Colors.blue} 
            style={styles.action}
            onPress={() => navigation.goBack()}>
          <Icon icon={faArrowLeft} label='Voltar' />
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight underlayColor={Colors.blue} 
            style={styles.action}
            onPress={onShowModal}>
          <Icon icon={faBars} label='Menu' />
        </TouchableHighlight>
      )
    }
  }

  const renderRightAction = () => {
    if(showActions === true){
      return (
        <TouchableHighlight underlayColor={Colors.blue} 
            style={styles.action}
            onPress={onSave}>
          <Icon icon={faFloppyDisk} label='Salvar' />
        </TouchableHighlight>
      )
    } else {
      return <View style={styles.action}></View>
    }
  }

  return (
    <View style={styles.ctn}>
      <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
      />

      <View style={styles.ctnl}>
        {renderLeftAction()}
        
        <Logo/>

        {renderRightAction()}
      </View>
    </View>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
    height:screen.height * 0.35,
    width:screen.width,
    backgroundColor:Colors.blue,
    paddingBottom:(screen.height * 0.35) /2,
    justifyContent:'center',
    alignItems:'center'
  },
  ctnl:{
    flexDirection:'row',
    backgroundColor:Colors.blue,
    justifyContent:'center',
    alignItems:'center',
    marginTop:(screen.height * 0.25) / 4,
    width:screen.width - 20
  },
  action:{
    width:screen.width * 0.2,
    justifyContent:'flex-start'
  },
});