import React from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    Linking,
    TouchableHighlight,
    View,
}from 'react-native';
import Label from '../components/Label';
import Logo from '../components/Logo';
import { Colors } from '../utils';
import Icon from '../components/Icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AboutScreen({navigation}) {

  return (
    <ScrollView style={styles.wrap} contentContainerStyle={styles.wrapContent}>
      <TouchableHighlight underlayColor={Colors.blue} 
          onPress={() => navigation.goBack()} style={styles.goBackWrap}>
        <Icon icon={faArrowLeft} label='Voltar' />
      </TouchableHighlight>

      <Logo />

      <Label value={'Olá! Tudo bem?\n\nEsse app foi criado para incentivar seu momento de devoção e comunhão com Deus. Aqui você pode registrar seus estudos, impressões, dúvidas, anotações e motivos de oração com muita facilidade.\n\nNós não coletamos seus dados e nem compartilhamos com terceiros, embora você possa compartilhar suas anotações com quem desejar, visando manter a experiência do app sendo a mais segura possível.\n\nPara manter nossos projetos em constante melhoria precisamos reservar um espaço no aplicativo para anúncios. Contudo, caso você possua o desejo de ofertar em qualquer um de nossos projetos, nos contate via e-mail para lrobertodaldegan@hotmail.com.\n\nPor fim, agradeço a Deus pela oportunidade de construir esse app em família! Ao Senhor toda honra e glória!\n\nJé, não tenho palavras para te agradecer pelo apoio e incentivo de sempre! Obrigado por fazer parte desse projeto!\n\nObrigado a você que baixou e está usando nosso app!\n\nQue Deus te abençoe e que o reino de Deus venha!'}
          style={styles.lbl}
          size={16}/>

      <TouchableHighlight underlayColor={Colors.blue}
          onPress={() => Linking.openURL('https://www.instagram.com/lucasrobertodev/')}>
        
        <Label value={'Por @lucasrobertodev'} style={styles.lbl}/>
      </TouchableHighlight>
    </ScrollView>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:Colors.blue,
  },
  wrapContent:{
    alignItems:'center',
    paddingVertical: screen.height * 0.06,
    paddingHorizontal:30
  },
  goBackWrap:{
    width:screen.width - 60,
    marginBottom:10,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  lbl:{
    marginTop:50,
    textAlign:'justify'
  },
});