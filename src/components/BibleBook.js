import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
}from 'react-native';
import {Colors} from '../utils/Colors';
import WhiteButton from './WhiteButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Label from './Label';
import BibleBookChapter from './BibleBookChapter';
import { getChapter } from '../service/BibleService';
import BibleBookVerse from './BibleBookVerse';

export default function BibleBook({
                                label, 
                                abrev, 
                                chapters=0, 
                                expand=false, 
                                chapter=null, 
                                verse=null, 
                                selectable=false,
                                onVerseSelect=(txt)=>null,
                                onAutomaticSelect=()=>null}) {

  const [expanded, setExpanded] = useState(false);
  const [showChapterContent, setShowChapterContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chapterVerses, setChapterVerses] = useState([]);
  const [chapterSelected, setChapterSelected] = useState(null);
  const [icon, setIcon] = useState(faChevronDown);

  useEffect(() => {
    if(chapter !== null && expand === true){
      setExpanded(true);
      handleChapterSelection(chapter);

      onAutomaticSelect();
    }
  },[]);

  const handleChapterSelection = (chapter) => {
    setLoading(true);

    if(chapter === chapterSelected){
      setChapterSelected(null);
      setChapterVerses([]);
      setShowChapterContent(false);
      setLoading(false);
    } else {
      setChapterSelected(chapter);

      getChapter(abrev, chapter).then((result) => {
        if(result.status === 200){
          setChapterVerses(result.content.verses);
          setShowChapterContent(true);
          setExpanded(true);
          setIcon(faChevronUp);
        }

        setLoading(false);
      });
    }
  }

  const handlePress = () => {
    let exp = !expanded;

    setExpanded(exp);
    
    setIcon(exp === true ? faChevronUp : faChevronDown);

    if(exp === false){
      setShowChapterContent(false);
      setChapterSelected(null);
      setLoading(false);
    }
  }

  const renderChapters = () => {
    if(expanded === true){
      let opts = []
      
      for(let i=0; i < chapters; i++){
        opts.push(
          <BibleBookChapter key={`${abrev}${i}`} 
              chapter={i+1} 
              selected={chapterSelected === i+1}
              onSelection={handleChapterSelection}/>
        );
      }

      return (
        <View style={styles.chapWrap}>
          {opts}
        </View>
      )
    } else {
      return <></>
    }
  }

  const renderContent = () => {
    if(loading === true){
      return <ActivityIndicator color={Colors.white} 
                style={{marginVertical:10}} size="small"/>
    } else {
      if(showChapterContent === true){
        let verses = [];

        chapterVerses.map((cv) => {
          let bold =  verse === cv.number && expand === true 
                                          && chapter === chapterSelected;
          verses.push(
            <BibleBookVerse chapterVerse={cv} 
                key={`${abrev}${chapter}${cv.number}`}
                chapter={chapterSelected}
                book={label}
                abrev={abrev}
                selectable={selectable}
                bold={bold}
                onSelect={onVerseSelect}
            />
          );
        });

        return (
          <View style={styles.chapterContentWrap}>
            {verses}
          </View>
        )
      } else {
        return <></>
      }
    }
  }

  return (
    <View style={styles.wrap}>
      <WhiteButton icon={icon} label={label} 
          align='flex-start'
          action={() => handlePress()}/>

      {renderChapters()}

      {renderContent()}
    </View>
  )
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    marginBottom:15
  },  
  chapWrap:{
    flexDirection:'row',
    flexWrap:'wrap',
    maxWidth:screen.width - 20,
    paddingHorizontal:8,
    justifyContent:'center',
    marginTop:10
  },
  chapOpt:{
    width: (screen.width - 20) * 0.1,
    height: 40,
    borderRadius:5,
    backgroundColor:Colors.lightBlue,
    marginHorizontal:2,
    marginVertical:2,
    justifyContent:'center',
    alignItems:'center'
  },
  chapSelected:{
    borderWidth:2,
    borderColor:Colors.white,
    backgroundColor:Colors.blue,
  },
  chapterContentWrap:{
    backgroundColor:Colors.white,
    borderRadius:5,
    marginVertical:10,
    paddingVertical:20,
    paddingHorizontal:30
  },
  verseLbl:{
    color:Colors.darkGray,
    fontFamily:'JosefinSans-Light',
    marginBottom:5
  },
});