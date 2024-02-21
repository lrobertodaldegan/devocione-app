import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Colors } from "../utils";

export default function Divider({color=Colors.white}) {
  return (
    <View style={[styles.wrap, {backgroundColor:color}]}></View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    height:1,
    width:screen.width * 0.2,
    marginLeft:screen.width * 0.35,
  }
});