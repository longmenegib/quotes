import React, {useState ,useEffect, useRef} from 'react'
import { Dimensions, StyleSheet, Text, View, ImageBackground, Alert, Share } from 'react-native';
import ViewPager from "@react-native-community/viewpager";
import axios from '../axios';
import {Asset} from 'expo-asset';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import pictures from './pictures';
import ViewShot, { captureRef, captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';


export default function SubCategory({route}) {

    const {title, navigation} = route.params;
    const [quotes, setQuotes] = useState([]);
    const viewRef = useRef(null);
    const pagerRef = useRef(null)
    const noOfPic = 30;
    const bgColor = ['red', 'green', 'black', 'pink', 'blue','brown', 'orange', 'gray'];
   
    //get the quotes on the api

    useEffect(()=>{
       
            axios.get(`/quotes/quotePer?category=${title}`).then((response)=>{
                console.log(response.data)
                setQuotes(response.data)
            });
        
    }, []);

     //function to select the images randomly
     const getRandomPic = ()=> {
        const random = Math.floor(Math.random() * Math.floor(noOfPic));
       
        return Asset.fromModule(pictures[random]).uri;
    };

    //function to select the images randomly
    const getRandomColor = ()=> {
        var item = Math.floor(Math.random() * bgColor.length);
        return bgColor[item];
    };
   

    //download the image
    const downloadImage = async (send)=>{
        try{
            // const uri = await captureRef(viewRef,{
            //     format: 'png',
            //     quality: 0.8,
            // });
            const uri = await captureScreen({
                format:'png',
                quality: 1,
            });

            console.log("this is the uri path", uri)

            //cameraroll saves image
            const image = MediaLibrary.saveToLibraryAsync(uri);
            if(send){
                Alert.alert(
                    '',
                    'Image saved successfully.',
                    [{text: 'OK', onPress:()=>{}}],
                    {cancelable: false},
                );
            }else{
                sharingImage(uri);
            }
           
        }catch(err){
            console.log(err)
        }
    };

    //share the downloaded image
    const sharingImage = async(url)=>{
        const result = await Sharing.shareAsync(url,{
            mimeType:'type/image'
        })
    }

    const listPage = ()=>{
        navigation.navigate("SubPage",{
            title: title,
        });
    }

    const checkTtitle = (value)=>{
        const arr = ['Love', 'Sadness and Pain', 'Dreams and Life', 'Reality and Facts'];
        return arr.indexOf(value) > -1;
    }

    return (
        <ViewPager
            style={styles.viewPager}
            initialPage={0}
            overdrag={false}
            showPageIndicator={true}
            ref = {pagerRef}
        >
            {quotes.map((res)=>{
                return(
                    <ViewShot key={res.id}>
                        <View style={styles.header}>
                            <Text style={styles.title}>{JSON.stringify(title).replace(/["]+/g, '')}</Text>
                            <View style={[styles.fonts]}>
                                <FontAwesome5 name={"list"} light onPress={listPage} size={20} color='gray'/>
                                <FontAwesome5 name={"download"} light onPress={()=>downloadImage(true)} size={20} color='gray'/>
                                <FontAwesome5 name={"share"} light onPress={()=>downloadImage(false)} size={20} color='gray'/>
                            </View>
                        </View>
                        
                       
                        <View
                            source={{
                                uri: getRandomPic(),
                            }}
                            style={[styles.body,{backgroundColor: getRandomColor()}, checkTtitle(title)===false?{display:"flex"}: {display:'none'}]}
                            ref={viewRef}
                        >
                                <Text style={[styles.content]}>  
                                    {res.text}
                                </Text>
                        </View>
                        <ImageBackground 
                            source={{
                                uri: getRandomPic(),
                            }}
                            style={[styles.body,{backgroundColor: getRandomColor()}, checkTtitle(title)===true?{display:"flex"}: {display:'none'}]}
                            ref={viewRef}
                        >
                                <Text style={[styles.content]}>  
                                    {res.text}
                                </Text>
                        </ImageBackground>
                      
                    </ViewShot> 
                )
            })} 
        </ViewPager>
    )
}

const height=Dimensions.get("screen").height;

const styles=StyleSheet.create({
    viewPager: {
        flex: 1,
        textAlign: 'center',
    },
    body:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'center', 
        resizeMode: 'contain',
        alignItems: 'center',
        backgroundColor: 'red',
        
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        backgroundColor:'rgb(240,240,240)',
        color: 'gray',
        fontWeight: 'bold'
    },
    content:{
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        top: -50,
        fontSize: 50,
        fontWeight: 'bold',
        paddingTop:100,
    },
    image:{
        width: 400,
        height: 600,
    }, 
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fonts:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 100,
        marginRight: 10
    }
})