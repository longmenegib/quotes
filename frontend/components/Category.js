import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Category({navigation, title}) {
    return (  
        <View style={styles.homeCat} >
            <Text style={styles.catTitle} onPress={()=>navigation.navigate('Subcategory', {
                title: title,
                navigation: navigation
            })}> {title}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    homeCat:{
        textAlign:'center',
        backgroundColor:'rgb(200,100,40)',
        flex:0,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        justifyContent: 'center',
        marginBottom: 1
    },
    catTitle:{
        color:'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})