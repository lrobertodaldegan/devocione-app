import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    RefreshControl,
}from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Label from '../components/Label';
import { Colors, Days } from '../utils';
import Button from '../components/Button';
import { faArrowRight, faArrowRotateLeft, faBook } from '@fortawesome/free-solid-svg-icons';
import { DevocionalService } from '../service/DevocionalService';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';
import { getRandomVerse, getVerseFromCache } from '../service/BibleService'; 
import GrayButton from '../components/GrayButton';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const [margin, setMargin] = useState(0);
  const [date, setDate] = useState(null);
  const [text, setText] = useState({ref:'', content:''});
  const [loading, setLoading] = useState(true);
  const [loadingDevocionais, setLoadingDevocionais] = useState(true);
  const [devocionais, setDevocionais] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    let d = new Date();

    setDate(`${Days[d.getDay()]} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  }, []);

  useEffect(()=>{
    if(text.ref.length <= 0)
        getVerse();
  }, []);

  useEffect(()=>{
    loadDevocionais();
  }, [isFocused]);

  const loadDevocionais = () => {
    DevocionalService.meusDevocionais()
    .then((ds) => {
      setDevocionais(ds && ds !== null ? ds : []);
      setLoadingDevocionais(false);
    });
  }

  const handleVerseLoading = (result) => {
    let t = null;

    if(result.status === 200){
        t = {
          ref:`${result.content.book.name} ${result.content.chapter}:${result.content.number}`,
          content:result.content.text,
          book:result.content.book.name,
          abrev:result.content.book.abbrev,
          chapter:result.content.chapter,
          verse:result.content.number,
          success:true
        }
    } else {
        t = {
          ref:'Tente novamente!',
          content:'Não foi possível obter o texto!',
          success:false
        }
    }

    setText(t);
    setLoading(false);
  }

  const getVerse = (change) => {
    setLoading(true);

    if(change === true){
      getRandomVerse().then(handleVerseLoading);
    } else {
      getVerseFromCache().then(handleVerseLoading);
    }
  }

  const ajustLayout = (layoutCardContent) => {
    const {height} = layoutCardContent;

    setMargin(height - 20);
  }

  const renderText = () => {
    if(loading === false){
      return (
        <>
          <Label value={`${text.content}`} 
              size={18} style={styles.txt} bold={true}/>

          <View style={styles.refWrap}>
            <Label value={`${text.ref} NVI`} 
                size={18} style={[styles.txt, styles.ref]} bold={true}/>

            <GrayButton label='Ver contexto' 
                labelSize={14}
                iconSize={10}
                icon={faBook} 
                action={() => navigation.navigate('Bible', {book:text.book, chapter:text.chapter, verse:text.verse})}/>
          </View>
        </>
      )
    } else {
      return <ActivityIndicator style={{marginVertical:10}}
                  size="small" color={Colors.blue} />
    }
  }

  const renderTextActions = () => {
    if(text.success && text.success === true){
      return (
        <View style={styles.cardBtnWrap}>
          <GrayButton label='Mudar sugestão' 
              labelSize={16}
              iconSize={10}
              icon={faArrowRotateLeft} 
              action={() => getVerse(true)}/>
          
          <Button label='Iniciar' icon={faArrowRight} 
              action={() => navigation.navigate('Devocional', {dt:date, ref:text.ref, text:`${text.content}\n\n${text.ref} NVI`})}/>
        </View>
      );
    } else {
      <></>
    }
  }

  return (
    <FlatList contentContainerStyle={styles.ctn}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        refreshControl={
          <RefreshControl refreshing={loadingDevocionais} 
              onRefresh={loadDevocionais} />
        }
        ListHeaderComponent={
          <View style={styles.listHeaderCtn}>
            <Header navigation={navigation}/>

            <Card content={
              <View style={styles.cardContent} 
                  onLayout={(ev) => ajustLayout(ev.nativeEvent.layout)}>

                <Label value={`${date}`} style={styles.lbl}/>

                <Label value={'Texto sugerido'} size={18} 
                    style={styles.lbl}/>

                {renderText()}
                
                {renderTextActions()}
              </View>
            }/>

            <Label value={'Meus devocionais'} 
                size={18} bold={true}
                style={[styles.txt, {marginTop:margin}]} />
          </View>
        }
        data={devocionais}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<View style={styles.emptyCtn}></View>}
        ListFooterComponent={<Footer/>}
        renderItem={ ({item}) => <ListItem navigation={navigation} item={item}/>}
    />
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
      minHeight:screen.height
  },
  listHeaderCtn:{},
  emptyCtn:{
      height:screen.height * 0.5
  },
  cardContent:{
      alignItems:'center',
  },
  lbl:{
      color:Colors.gray,
      textAlign:'center',
      marginTop:5,
  },
  txt:{
      color:Colors.blue,
      textAlign:'center'
  },
  ref:{
    marginRight:10,
    color:Colors.gray,
  },
  refWrap:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20
  },
  cardBtnWrap:{
      flexDirection:'row',
      alignItems:'center',
      width:screen.width * 0.6,
      justifyContent:'space-between'
  },
});