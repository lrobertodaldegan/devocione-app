import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight,
}from 'react-native';
import Label from '../components/Label';
import { Colors, Plans } from '../utils';
import { PlanService } from '../service/PlanService';
import Icon from '../components/Icon';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import PlanListItem from '../components/PlanListItem';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/1717135646';

export default function PlansScreen({navigation}) {
  const [itens, setItens] = useState([]);
  const [itensChecked, setItensChecked] = useState([]);
  const [list, setList] = useState('A');//A, S ou F

  useEffect(() => {
    loadCheckeds();
  }, []);

  const loadCheckeds = () => {
    PlanService.planoAnualMarcados()
    .then(pas => {
      let marcados = [];

      for(let i=0; i < pas.length; i++){
        let marcado = pas[i];

        marcado.type = 'A';
        marcado.selected=true;

        marcados.push(marcado);
      }

      PlanService.planoSemestralMarcados()
      .then(pss => {
        for(let i=0; i < pss.length; i++){
          let marcado = pss[i];
  
          marcado.type = 'S';
          marcado.selected=true;
  
          marcados.push(marcado);
        }

        PlanService.planoLivreMarcados()
        .then(pls => {
          for(let i=0; i < pls.length; i++){
            let marcado = pls[i];
    
            marcado.type = 'F';
            marcado.selected=true;
    
            marcados.push(marcado);
          }

          setItensChecked(marcados);
        });
      });

      let is = [];

      for(let c=0; c < Plans.anual.length; c++){
        let it = {...Plans.anual[c], type:'A'};
        
        it.selected = marcados.filter(item => item.id === it.id 
                                            && item.type === it.type).length > 0;
        is.push(it);
      }
          
      setItens(is);
      setList('A');
    });
  }

  const handleSelection = (item, type) => {
    let im = itensChecked;
    
    if(!im.includes(item)){
      PlanService.marcarPlano(item, type);

      item.selected=true;

      im.push(item);

      setItensChecked(im);
    } else {
      PlanService.desmarcarPlano(item, type);
    }

    handleListSelection(type);
  }

  const handleListSelection = (type) => {
    let i = [];
    let is = [];

    if(type === 'A')
      i = Plans.anual;

    if(type === 'S')
      i = Plans.semestral;

    if(type === 'F')
      i = Plans.livre;

    for(let c=0; c < i.length; c++){
      let it = {...i[c], type:type};
      
      it.selected = itensChecked.filter(item => item.id === it.id 
                                            && item.type === it.type).length > 0;
      is.push(it);
    }
        
    setItens(is);
    setList(type);
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.adWrap}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{requestNonPersonalizedAdsOnly: false,}}
        />
      </View>

      <TouchableHighlight underlayColor={Colors.blue} 
          onPress={() => navigation.goBack()} style={styles.goBackWrap}>
        <Icon icon={faArrowLeft} label='Voltar' />
      </TouchableHighlight>

      <Label value='Planos de leitura da Bíblia'
          size={20}
          style={styles.title}/>

      <View style={styles.optionsWrap}>
        <TouchableHighlight underlayColor='transparent'
            style={[styles.opt, list === 'A' ? styles.optSlctd : {}]}
            onPress={() => handleListSelection('A')}>
          <Label value='Plano anual' size={16}/>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='transparent'
            style={[styles.opt, list === 'S' ? styles.optSlctd : {}]}
            onPress={() => handleListSelection('S')}>
          <Label value='Plano semestral' size={16}/>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='transparent'
            style={[styles.opt, list === 'F' ? styles.optSlctd : {}]}
            onPress={() => handleListSelection('F')}>
          <Label value='Plano livre' size={16}/>
        </TouchableHighlight>
      </View>

      <FlatList contentContainerStyle={styles.listWrap}
        keyboardDismissMode='on-drag' 
        keyboardShouldPersistTaps='always'
        data={itens}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({item}) =>
          <PlanListItem item={item} 
              navigation={navigation}
              onSelect={handleSelection}
              selected={item.selected}
          />
        }
        ListFooterComponent={
          <View style={{alignItems:'center', marginTop:20}}>
            <Label value='Por @lucasrobertodev' 
                style={{textAlign:'center', margin:20}}/>
          </View>
        }
      />
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    padding:10,
    width:screen.width,
    height:screen.height,
    backgroundColor:Colors.blue,
  },
  adWrap:{
    alignItems:'center',
    marginBottom:10
  },
  optionsWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:10,
  },
  opt:{
    alignItems:'center',
    justifyContent:'center',
    height:screen.height * 0.05,
    padding:10,
  },
  optSlctd:{
    borderRadius:10,
    backgroundColor:'rgba(255,255,255,0.6);'
  },
  title:{
    textAlign:'center'
  },
  goBackWrap:{
    alignItems:'flex-start'
  },
  listWrap:{
    marginBottom:50
  },
});