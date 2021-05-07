import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import Category from './Category';
import axios from '../axios';
import {Asset} from 'expo-asset';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home({navigation}) {

    let [category, setCategory]= useState([]);
   
    useEffect(()=>{
        try{
                axios.get(`/quotes/category`).then((res)=>{
                    setCategory(res.data);
                });
         
        }catch{
            console.log("error error")
        }
    },[])

    return (
        <ScrollView style={styles.home}>
            <ImageBackground 
                            source={{
                                uri: Asset.fromModule(require(`../images/image_1.jpg`)).uri,
                            }}
                 style={styles.Head}>
                <Text style={styles.headTitle}>Best motivational Quotes</Text>
                <FontAwesome5 name={"list"} light size={30} color='white' style={styles.menu} onPress={()=>navigation.navigate('Options')}/>
            </ImageBackground>
            <View style={styles.Category}>
                {category.map((res)=>{
                    return(
                        <Category navigation={navigation} title={res.name} key={res.id}/>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const heght = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles= StyleSheet.create({
    headTitle:{
       color:'white',
       fontSize: 30,
       fontWeight: 'bold',
       
    },
    home:{
        backgroundColor: 'rgb(240,240,240)',
        height:heght,
    },
    Head:{
        textAlign:'center',
        backgroundColor:'gray',
        flex:0,
        flexDirection: 'column',
        alignItems: 'center',
        height: heght/3,
        justifyContent: 'center'
    },
    Category:{
        backgroundColor:'black'
    },
    menu:{
        position: 'absolute',
        top: 5,
        left: 5
    }
})