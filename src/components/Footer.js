import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
}from 'react-native';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/2531953129';

import {Colors} from '../utils/Colors';
import Label from './Label';

export default function Footer() {
    return (
        <View style={styles.ctn}>
            <View style={styles.ctnl}>
                <Label style={[styles.lbl]} value={'Por @lucasrobertodev'}/>
            </View>

            <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{requestNonPersonalizedAdsOnly: false,}}
            />
        </View>
    )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
    ctn:{
        justifyContent:'center',
        alignItems:'center'
    },
    ctnl:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginBottom:40
    },
    lbl:{
        color:Colors.gray,
        marginTop:5,
        textAlign:'center'
    },
});