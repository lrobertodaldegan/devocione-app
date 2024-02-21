import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    Switch,
    TouchableHighlight,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Label from '../components/Label';
import { Colors } from '../utils';
import { DevocionalService } from '../service/DevocionalService';
import Footer from '../components/Footer';
import Input from '../components/Input';
import PrayReasons from '../components/PrayReasons';
import BibleVerse from '../components/BibleVerse';
import TextArea from '../components/TextArea';

export default function DevocionalScreen({navigation, route}) {

  const { text, dt, ref, devocional, details } = route.params;

  const [margin, setMargin] = useState(0);
  const [msg, setMsg] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [pray, setPray] = useState(null);
  const [title, setTitle] = useState(null);
  const [revelation, setRevelation] = useState(null);
  const [application, setApplication] = useState(null);
  const [showTopics, setShowTopics] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setMsg(devocional ? devocional.msg : null);
    setCtx(devocional ? devocional.ctx : null);
    setPray(devocional ? devocional.pray : null);
    setTitle(devocional ? devocional.title : null);
    setRevelation(devocional ? devocional.revelation : null);
    setApplication(devocional ? devocional.application : null);
  }

  const ajustLayout = (layoutCardContent) => {
    const {height} = layoutCardContent;

    setMargin(height);
  }

  const handleSubmit = () => {
    let devo = {
      id:devocional ? devocional.id : new Date().getTime(),
      dt:devocional ? devocional.dt : dt,
      ref:devocional ? devocional.ref : ref,
      txt:devocional ? devocional.txt : text,
      title:title,
      msg:msg,
      ctx:ctx,
      revelation:revelation,
      application:application,
      pray:pray,
    }

    DevocionalService.salvarDevocional(devo)
    .then(() => navigation.navigate('Home'));
  }

  const renderInputs = () => {
    if(showTopics === false){
      return (
        <>
          <Input label={'Qual a mensagem central do texto?'}
              value={msg}
              onChange={(val) => setMsg(val)}/>

          <Input label={'Qual o contexto?'}
              value={ctx}
              onChange={(val) => setCtx(val)}/>

          <Input label={'Como o texto revela Jesus?'}
              value={revelation}
              onChange={(val) => setRevelation(val)}/>

          <Input label={'Como aplicar a mensagem ao meu dia-a-dia?'}
              value={application}
              onChange={(val) => setApplication(val)}/>

          <Input label={'Minha oração'}
              value={pray}
              onChange={(val) => setPray(val)}/>
        </>
      )
    } else {
      return (
        <TextArea value={msg}
            onChange={(val) => setMsg(val)}/>
      )
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.ctn} 
        keyboardShouldPersistTaps='always'>
      <View style={[styles.listHeaderCtn, {marginBottom:margin}]}>
          <Header navigation={navigation} showActions={true} 
              onSave={() => handleSubmit()}
          />

          <Card content={
            <View style={styles.cardContent}
                onLayout={(ev) => ajustLayout(ev.nativeEvent.layout)}>

              <Label value={`${devocional ? devocional.dt : dt}`} 
                  style={styles.lbl}/>

              <TextInput value={title} 
                  style={styles.input}
                  onChangeText={(text) => setTitle(text)}
                  placeholder='Insira um título'
                  placeholderTextColor={Colors.gray}
                  textBreakStrategy='simple'
                  multiline={true}
              />

              <BibleVerse navigation={navigation} text={details} />

              <View style={styles.btnsWrap}>
                <View style={styles.toggleWrap}>
                  <Switch
                      trackColor={{false: Colors.lightGray, true: Colors.blue}}
                      thumbColor={Colors.white}
                      ios_backgroundColor={Colors.white}
                      onValueChange={setShowTopics}
                      value={showTopics}/>

                  <Label value={showTopics === true ? `Texto livre` : 'Tópicos'} 
                      style={styles.toggleLbl} size={14}/>
                </View>

                <TouchableHighlight underlayColor={'transparent'}
                    onPress={() => navigation.navigate('Search')}>

                  <Label value={'Pesquisa bíblica'}
                      style={styles.toggleLbl} size={14}/>
                </TouchableHighlight>
              </View>

              {renderInputs()}

              <PrayReasons />
            </View>
          }/>
        </View>
        <Footer/>
    </ScrollView>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
    minHeight:screen.height
  },
  listHeaderCtn:{},
  cardContent:{
    minHeight:screen.height * 0.3,
    width:screen.width - 60,
  },
  lbl:{
    color:Colors.gray,
    marginTop:5,
    textAlign:'center'
  },
  question:{
    textAlign:'justify',
    marginBottom:10,
  },
  txt:{
    color:Colors.blue,
    marginTop:10,
    marginBottom:20,
    textAlign:'center'
  },
  input:{
    color:Colors.gray,
    fontFamily:'JosefinSans-Bold',
    fontSize:18,
    textAlign:'center'
  },
  btnsWrap:{
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  toggleWrap:{
    alignItems:'center',
    flexDirection:'row',
    marginVertical:10,
  },
  toggleLbl:{
    color:Colors.gray,
    marginLeft:5
  },
});