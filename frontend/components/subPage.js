import React, {useState, useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, Share } from 'react-native';
import axios from '../axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function subPage({route}) {

    const {title} = route.params;
    const [quotes, setQuotes] = useState([]);
    useEffect(()=>{
        axios.get(`/quotes/quotePer?category=${title}`).then((res)=>{
            setQuotes(res.data);
        })
    }, []);

    const shareQuote=(msg)=>{
        Share.share({
            message: msg,
            title: title
        })
    }

    return (
       <ScrollView style={{backgroundColor: 'white'}}>
           <Text style={styles.title}>{title}</Text>
            <View>
                {quotes.map((res)=>{
                    return(
                        <View style={styles.quote} key={res.id}>
                            <View style={styles.text}>
                                <Text style={{fontWeight: 'bold', fontSize: 15}}>{res.text}</Text>
                            </View>
                            <View style={styles.fonts}>
                              
                                <FontAwesome5 name={"heart"} solid color={'gray'} size={20}/>
                                <FontAwesome5 name={"share"} light size={20} onPress={()=>shareQuote(res.text)} color='gray'/>
                            </View>
                        </View>
                    )
                })}
            </View>
       </ScrollView>
    )
}

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    quote:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        marginBottom: 3,
        backgroundColor: 'pink',
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        backgroundColor:'rgb(255,255,255)',
        color: 'gray',
        fontWeight: 'bold'
    },
    fonts:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 100,
        marginRight: 10
    },
    text:{
        paddingLeft: 5,
        width: width-100,
        color: 'white',
    }
})