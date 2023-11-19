import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    FlatList,
}from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Label from '../components/Label';
import { Colors, Days } from '../utils';
import Button from '../components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DevocionalService } from '../service/DevocionalService';
import ListItem from '../components/ListItem';
import Footer from '../components/Footer';

export default function DevocionalScreen({navigation}) {
    const [date, setDate] = useState(null);

    useEffect(() => {
        let d = new Date();

        setDate(`${Days[d.getDay()]} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
    }, []);

    return (
        <FlatList contentContainerStyle={styles.ctn}
            ListHeaderComponent={
                <View style={styles.listHeaderCtn}>
                    <Header navigation={navigation} showActions={true}/>

                    <Card content={
                        <View style={styles.cardContent}>
                            <Label value={`${date}`} style={styles.lbl}/>

                            <Label value={'Insira um título'} size={16} style={styles.lbl}/>

                            <Label value={'Sejam meus imitadores como eu sou de Cristo\n1 Coríntios 11:1'} 
                                    size={18} style={styles.txt} bold={true}/>
                            
                            <Label value={'Qual a mensagem central do texto?'} size={14} 
                                    style={[styles.lbl, styles.question]}/>

                            <Label value={'Qual o contexto?'} size={14} 
                                    style={[styles.lbl, styles.question]}/>

                            <Label value={'Como o texto revela Jesus?'} size={14} 
                                    style={[styles.lbl, styles.question]}/>

                            <Label value={'Como aplicar a mensagem ao meu dia-a-dia?'} size={14} 
                                    style={[styles.lbl, styles.question]}/>

                            <Label value={'Minha oração:'} size={14} 
                                    style={[styles.lbl, styles.question]}/>

                            <Label value={'Interceder por:'} size={14} 
                                    style={[styles.lbl, styles.question]}/>
                        </View>
                    }/>
                </View>
            }
            ListEmptyComponent={<View style={styles.emptyCtn}></View>}
            ListFooterComponent={<Footer/>}
            renderItem={ ({item}) => <ListItem item={item}/>}
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
        height:screen.height * 3
    },
    cardContent:{
        minHeight:screen.height * 0.3,
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
});