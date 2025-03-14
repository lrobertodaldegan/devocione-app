import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    View,
    FlatList,
    ActivityIndicator,
    TextInput,
}from 'react-native';
import Label from '../components/Label';
import { Colors } from '../utils';
import Icon from '../components/Icon';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchVerses } from '../service/BibleService';
import SearchBibleVerseItem from '../components/SearchBibleVerseItem';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/2531953129';

export default function SearchScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState(null);
  const [sResult, setSResult] = useState([]);

  useEffect(() => {
    setWord(null);
    setLoading(false);
  }, []);

  const handleSearch = () => {
    if(word && word !== null && word.length > 2){
      setLoading(true);
    
      searchVerses(word).then((result) => {
        if(result && result != null)
          setSResult(result);

          setLoading(false);
      });
    }
  }

  const renderLoading = () => {
    if(loading == true){
      return (
        <ActivityIndicator color={Colors.white} 
              style={{marginVertical:50}} size="small"
          />
      );
    } else {
      let lbl = 'Não encontramos nada para essa pesquisa. 🤷🏻\n\nFaça uma nova busca...';

      if(!word || word === null)
        lbl = 'Digite uma palavra com mais de 2 letras\npara iniciar uma pesquisa. 🤓';

      return <Label value={lbl} 
                style={styles.notFoundLbl} size={12}/>
    }
  }

  return (
    <FlatList contentContainerStyle={styles.ctn}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        ListHeaderComponent={
          <View style={{alignItems:'center'}}>
            <BannerAd
                  unitId={adUnitId}
                  size={BannerAdSize.LARGE_BANNER}
                  requestOptions={{requestNonPersonalizedAdsOnly: false,}}
              />
              
            <View style={styles.header}>
              <TouchableHighlight underlayColor={Colors.blue} 
                  onPress={() => navigation.goBack()} style={styles.goBackWrap}>
                <Icon icon={faArrowLeft} label='Voltar' />
              </TouchableHighlight>

              <TextInput style={styles.input}
                  value={word} onChangeText={setWord}
                  placeholder='Digite uma palavra com mais de 2 letras'/>

              <TouchableHighlight underlayColor={Colors.blue} 
                  onPress={handleSearch} style={styles.goBackWrap}>
                <Icon icon={faSearch} label='Buscar' />
              </TouchableHighlight>
            </View>
          </View>
        }
        data={sResult}
        keyExtractor={(item) => `${item.book.name}${item.chapter}${item.number}`}
        renderItem={({item}) => <SearchBibleVerseItem item={item} navigation={navigation}/>}
        ListEmptyComponent={renderLoading}
        ListFooterComponent={
          <View style={{alignItems:'center', marginTop:20}}>
            <Label value='Por @lucasrobertodev' 
                style={{textAlign:'center', margin:20}}/>
          </View>
        }
    />
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  ctn:{
    backgroundColor:Colors.blue,
    height:screen.height,
    padding:20
  },
  header:{
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  input:{
    width:(screen.width - 50) * 0.75,
    borderRadius:10,
    backgroundColor:Colors.white,
    marginHorizontal: 20,
    paddingHorizontal:10,
    fontFamily:'JosefinSans-Regular'
  },
  notFoundLbl:{
    textAlign:'center',
    marginTop:30
  },
});