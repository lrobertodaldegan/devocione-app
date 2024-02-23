import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TouchableHighlight,
    Linking,
}from 'react-native';
import Icon from '../components/Icon';
import Header from '../components/Header';
import Card from '../components/Card';
import Label from '../components/Label';
import { Colors, Days } from '../utils';
import Button from '../components/Button';
import { 
  faAddressCard, 
  faArrowRight,
  faArrowRotateLeft, 
  faBible, 
  faMobileScreenButton, 
  faQuoteRight, 
  faSearch, 
  faX, 
  faSort 
} from '@fortawesome/free-solid-svg-icons';
import { DevocionalService } from '../service/DevocionalService';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';
import { getRandomVerse, getVerseFromCache } from '../service/BibleService'; 
import GrayButton from '../components/GrayButton';
import { useIsFocused } from '@react-navigation/native';
import BibleVerse from '../components/BibleVerse';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1717135646';

export default function HomeScreen({navigation}) {
  const [margin, setMargin] = useState(0);
  const [date, setDate] = useState(null);
  const [text, setText] = useState({ref:'', content:''});
  const [loading, setLoading] = useState(true);
  const [loadingDevocionais, setLoadingDevocionais] = useState(true);
  const [devocionais, setDevocionais] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reverse, setReverse] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    setShowModal(false);
  }, []);

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

    if(result && result.status === 200){
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
      if(text.success === true)
        return <BibleVerse navigation={navigation} text={text} />
      
      return <GrayButton label='Algo deu erro! Tente novamente' 
                labelSize={16}
                iconSize={10}
                icon={faArrowRotateLeft} 
                action={() => getVerse(true)}/>
    } else {
      return <ActivityIndicator style={{marginVertical:10}}
                  size="small" color={Colors.blue} />
    }
  }

  const renderTextActions = () => {
    if(text.success && text.success === true){
      return (
        <>
          <View style={styles.cardBtnWrap}>
            <GrayButton label='Mudar sugestão' 
                labelSize={14}
                iconSize={10}
                icon={faArrowRotateLeft} 
                action={() => getVerse(true)}/>
            
            <GrayButton label='Escolher versículo' icon={faQuoteRight} 
                labelSize={14}
                action={() => navigation.navigate('Bible', {selectable:true})}/>
          </View>

          <Button label='Iniciar' icon={faArrowRight} 
              action={() => navigation.navigate('Devocional', {
                dt:date, 
                ref:text.ref, 
                text:`${text.content}\n\n${text.ref} NVI`,
                details:text
              })}
          />
        </>
      );
    } else {
      <></>
    }
  }

  const renderListItem = ({item}) => {
    let a = item.ref.split(" ").reverse();

    let b = '';

    for(let i=1; i < a.length; i++){
      b += `${a[i]} `;
    }

    let cv = a[0].split(":");

    let c = cv[0];
    let v = cv[1];

    let content = item.txt.split("\n")[0];

    let det = {
      ...item,
      content:content,
      book:b.trim(),
      chapter:+c,//passa transformando string em int
      verse:+v//passa transformando string em int
    }

    return <ListItem navigation={navigation} item={item} details={det}/>
  }

  const renderModalMenu = () => {
    if(showModal === true){
      return (
        <View style={styles.modalWrap}>
            
            <TouchableHighlight underlayColor={'transparent'} 
                style={styles.closeModal} onPress={()=>setShowModal(false)}>
              <Icon icon={faX} label='Fechar menu' style={styles.closeModalIcon}/>
            </TouchableHighlight>

          <View style={styles.menu}>
            <TouchableHighlight underlayColor={Colors.white} 
                style={styles.menuBtn}
                onPress={()=>navigation.navigate('Bible', {selectable:true})}>
              <Icon icon={faBible} label='Abrir Bíblia' />
            </TouchableHighlight>

            <TouchableHighlight underlayColor={Colors.white} 
                style={styles.menuBtn}
                onPress={()=>navigation.navigate('Search')}>
              <Icon icon={faSearch} label='Pesquisa bíblica' />
            </TouchableHighlight>

            <TouchableHighlight underlayColor={Colors.white} 
                style={styles.menuBtn}
                onPress={()=>Linking.openURL('https://play.google.com/store/apps/developer?id=Lucas+Roberto+Daldegan')}>
              <Icon icon={faMobileScreenButton} label='Nossos apps' />
            </TouchableHighlight>

            <TouchableHighlight underlayColor={Colors.white} 
                style={styles.menuBtn}
                onPress={()=>navigation.navigate('About')}>
              <Icon icon={faAddressCard} label='Sobre nós' />
            </TouchableHighlight>
          </View>

          <TouchableHighlight underlayColor={Colors.white} 
              style={{marginBottom:30}}
              onPress={()=>Linking.openURL('https://www.instagram.com/lucasrobertodev/')}>
            <Label value={`Por @lucasrobertodev`}
                style={{color:Colors.blue}} size={14}/>
          </TouchableHighlight>

          <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{requestNonPersonalizedAdsOnly: false,}}
          />
        </View>
      );
    } else {
      return <></>
    }
  }

  return (
    <>
      <FlatList contentContainerStyle={styles.ctn}
          keyboardDismissMode='on-drag' 
          keyboardShouldPersistTaps='always'
          refreshControl={
            <RefreshControl refreshing={loadingDevocionais} 
                onRefresh={loadDevocionais} />
          }
          ListHeaderComponent={
            <View style={styles.listHeaderCtn}>
              <Header navigation={navigation} onShowModal={() => setShowModal(true)}/>

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

              <Button action={() => setReverse(!reverse)} 
                  label='Meus devocionais'
                  icon={faSort}
                  style={{zIndex:10, marginTop:margin, marginBottom:10}}/>
            </View>
          }
          data={reverse ? devocionais.reverse() : devocionais}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<View style={styles.emptyCtn}></View>}
          ListFooterComponent={<Footer/>}
          renderItem={renderListItem}
      />

      {renderModalMenu()}
    </>
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
    width:screen.width * 0.75,
    justifyContent:'space-between',
    marginBottom:20
  },
  modalWrap:{
    position:'absolute',
    height:screen.height,
    width:screen.width,
    zIndex:100,
    backgroundColor:'rgba(255,255,255,0.9)',
    alignItems:'center',
    padding:10,
    paddingTop:screen.height * 0.18
  },
  menu:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginVertical:20,
  },
  menuBtn:{
    backgroundColor:Colors.blue,
    padding:10,
    borderRadius:10,
    margin:10,
  },
  closeModal:{
    width:screen.width - 10,
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  closeModalIcon:{
    color:Colors.blue
  },
});